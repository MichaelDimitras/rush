/*
* Global state class
* Manages db instance, environment variables
*/
const DB = require('./db');
const UrlLog = require('./urlLog');
let config = {};
try {
    config = require('../config.json');
}
catch (e) {
    if (e instanceof Error && e.code === 'MODULE_NOT_FOUND') {
        console.log('No config file found');
    } else {
        throw e;
    }
}


class Session{
    constructor() {
        this.environment = process.env.ENV || 'debug';
        this.db = new DB();
        this.urlLog = new UrlLog();
        this.webHookUrl = process.env.WEB_HOOK_URL || config.WEB_HOOK_URL;
        this.botToken = process.env.BOT_TOKEN || config.BOT_TOKEN;

        if (this.isProd() && !this.webHookUrl) {
            throw 'Fatal error. No webhook url found';
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