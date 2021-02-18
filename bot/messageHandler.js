/*
* Parse input to our Discord bot 
* and call the appropriate handler function
*/
const addHandler = require('./inputHandlers/addHandler');
const checkHandler = require('./inputHandlers/checkHandler');

class MessageHandler{
    constructor(db) {
        this.db = db;
    }

    parseMessageAndReply(message) {
        console.log(`Message recieved ${message.content}`);
        const prefix = '!';
        const addCommand = 'add';
        const checkCommand = 'check';

        if (message.author.bot) return;
        if (message.content[0] !== prefix) {
            return;
        }

        const args = getCommandArgs(message, prefix);

        if (!args.length) {
            message.reply(`I didn't find anything after the ${prefix}`);
        }

        const cmd = args[0];
        switch (cmd) {
            case addCommand:
                message.reply(addHandler(args, this.db));
                break;
            case checkCommand:
                message.reply(checkHandler(args, this.db));
                break;
            default:
                message.reply(`${prefix} should immediately be followed by one of "${addCommand}", "${checkCommand}"`);
        }
    }
}

const getCommandArgs = (message, prefix) => {
    const commandBody = message.content.slice(prefix.length);
    return commandBody.split(' ');
}

module.exports = MessageHandler;