const Discord = require("discord.js");
const config = require("./botconfig.json");

const addHandler = require('./inputHandlers/addHandler');
const listHandler = require('./inputHandlers/listHandler');
const checkHandler = require('./inputHandlers/checkHandler');

const prefix = '!';
const addCommand = 'add';
const checkCommand = 'check';
const listCommand = 'list';

class Bot {
    constructor(data) {
        this.client = createClient(data);
    }
}
const createClient = (data = []) => {
    const client = new Discord.Client();

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
            default:
                message.reply(`${prefix} should immediately be followed by one of "${addCommand}", "${listCommand}", "${checkCommand}"`);
        }
    });   

    console.log('Bot created, logging in');
    client.login(config.BOT_TOKEN);

    return client;
}

module.exports = Bot;
