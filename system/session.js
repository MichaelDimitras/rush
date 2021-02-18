const DB = require('./db');
const UrlLog = require('./urlLog');
const config = require('../config.json') || {};

class Session{
    constructor() {
        this.environment = process.env.ENV || 'debug';
        this.db = new DB();
        this.urlLog = new UrlLog();
        this.webHookUrl = process.env.WEB_HOOK_URL || config.WEB_HOOK_URL;
        this.botToken = process.env.BOT_TOKEN || config.BOT_TOKEN;

        if (this.isProd() && !this.webHookUrl) {
            throw 'Fatal error. No webhookurl found';
        }
        if (this.isProd() && !this.botToken) {
            throw 'Fatal error. No discord bot token found';
        }
    }

    isProd() {
        return this.environment === 'prod';
    }
}

module.exports = Session;