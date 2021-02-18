const fetch = require('node-fetch');
const RegexHelper = require('../util/regexHelper');
const MomentData = require('../data/momentData');
const getEmoji = require('../data/emoji');

class Messenger {
    constructor(webHookUrl) {
        this.webHookUrl = webHookUrl;
    }

    generateAndSendMessage(html, price, momentUrl) {
        const msg = generateMessage(html, price, momentUrl);
        sendMessage(msg, this.webHookUrl);
    }    
}

const generateMessage = (html, price, momentUrl) => {
    const playerName = RegexHelper.getPlayerName(html);
    const setName = RegexHelper.getSetName(html);
    const seriesName = RegexHelper.getSeriesName(html);
    const circulationCount = RegexHelper.getCirculationCount(html);
    const moment = new MomentData(momentUrl, playerName, setName, seriesName, price, circulationCount);

    const emoji = getEmoji();
    const msg = moment.printMessage(emoji);

    return msg;
}

const sendMessage = (message, webHookUrl) => {
    if(!typeof message === 'string') {
        console.error(`sendMessage expected message of type string instead got ${typeof message}`);
        return
    }
    fetch(webHookUrl, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({"username": "Low Price Bot", "content": message})
     })
     .then(res => console.log('Message sent ', message));
 }

 module.exports = Messenger;