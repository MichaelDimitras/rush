const Discord = require("discord.js");
const config = require("./botconfig.json");

const converter = require('../dbio/csvConverter');

const prefix = '!';
const addCommand = 'add';
const checkCommand = 'check';
const listCommand = 'list';
const helpCommand = 'help';

const urlRegex = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w\-]*)?(\?.*)?/
const topShotUrlRegex = /(https:\/\/www.nbatopshot.com\/listings\/p2p\/)/;

const isUrl = (string) => {
    return urlRegex.test(string);
}

const isTopShot = (string) => {
    return topShotUrlRegex.test(string);
}

class Bot {
    constructor(data) {
        this.client = createClient(data);
    }
}

const findUrlInData = (data, url) => {
    return data.find((item) => item[2] === url);
};

const createClient = (data = []) => {
    const client = new Discord.Client();

    const addHandler = (args, d) => {
        if (args.length !== 4) {
            return `ERROR: The check command should look like '!add [price] [description] [url]'`;
        } 

        const price = args[1];

        if (Number.isNaN(parseInt(price))) {
            return `ERROR: couldn't parse price for add command ${price}. Make sure you put a number here`;
        }

        const descrption = args[2];

        if (!typeof descrption === 'string') {
            return `ERROR: couldn't parse description for add command ${descrption}. Make sure you put a word here`;
        }

        if (isUrl(descrption)) {
            return `ERROR: the 2nd argument should  be a description not a url`;
        }

        const url = args[3];

        if (!typeof url === 'string') {
            return `ERROR: couldn't parse description for add command ${url}. Make sure you put a url here`;
        }

        if (!isUrl(url)) {
            return `ERROR: the 3rd argument is not a url`;
        }

        if (!isTopShot(url)) {
            return `ERROR: not a Top Shot listing url. It should start with 'https://www.nbatopshot.com/listings/p2p/'`;
        }

        for (let i = 0; i < d.length; i++) {            
            const con = new converter(d);
            if(d[i][2] === url) {               
                d[i][0] = price;
                con.saveFile(() => console.log(`File saved successfully`));
                return `Listing updated successfully`;
            } else {
                d.push([price, descrption, url]);
                con.saveFile(() => console.log(`File saved successfully`));
                return `New top shot added`;
            }
        }

        return `Listing failed to update`;
    }

    const checkHandler = (args, d) => {
        if (args.length !== 2) {
            return `ERROR: The check command should look like '!check [url]'`;
        }
        const url = args[1];

        const match = findUrlInData(d, url);
        if (match) {
            return `\nTarget price: ${match[0]}\nDescrption: ${match[2]}`
        } else {
            return `\n no listing found for that url`;
        }
    }

    const listHandler = (args) => {
        const listUrl = 'https://hottest916secretproject.herokuapp.com/list';
        return `List of target prices: ${listUrl}`;
    }

    client.on("message", (message) => { 
        if (message.author.bot) return;
        if (message.content[0] !== prefix) {
            return;
        }

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');

        if (!args.length) {
            message.reply(`I didn't find anything after the ${prefix}`);
        }

        const cmd = args[0];
        switch (cmd) {
            case addCommand:
                message.reply(addHandler(args, data));
                break;
            case checkCommand:
                message.reply(checkHandler(args, data));
                break;
            case listCommand:
                message.reply(listHandler(args, data));
                break;
            case helpCommand:
                message.reply('')
            default:
                message.reply(`${prefix} should immediately be followed by one of "${addCommand}", "${listCommand}", "${checkCommand}"`);
        }
    });   

    console.log('Bot created, logging in');
    client.login(config.BOT_TOKEN);

    return client;
}

module.exports = Bot;
