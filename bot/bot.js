/*
* A Discord bot.  Connects on instantiation
*/
const Discord = require("discord.js");
const MessageHandler = require('./messageHandler');

class Bot {
    constructor(session) {
        this.client = createClient(session);
    }
}
const createClient = (session) => {
    const client = new Discord.Client();
    const messageHandler = new MessageHandler(session.db);
    client.on("message", (msg) => messageHandler.parseMessageAndReply(msg));

    client.login(session.botToken);
    console.log('Bot created, logged in');

    return client;
}

module.exports = Bot;
