const parser = require('../dbio/parser');
const priceChecker = require('./priceChecker');
const sendMessage = require('./messenger');
const UrlLog = require('../dbio/urlLog');

const Bot = require('../bot/bot');

const urlLog = new UrlLog();

const runner = (data) => {
    if(!Array.isArray(data)) {
        console.error(`Parsed data is not type array. Intead it is ${typeof data}`);
        return;
    }

    //assumes first row is headers
    for (let i = 1; i < data.length; i++) {
        try {
            if(!Array.isArray(data[i])) {
                console.error(`Line ${i} of data is not an array. Intead it is ${typeof data[i]}`);
            } else if (data.length < 2) {
                console.error(`Missing data for row ${i} of file`);
            } else {
                const targetPrice = data[i][0];
                const url = data[i][2];    
                if (urlLog.hasItem(url)) {
                    // console.log(`Message already sent for ${url}`);
                    return;
                } else {
                    priceChecker(url, targetPrice, console.log);
                    // priceChecker(url, targetPrice, sendMessage);
                    urlLog.addItem(url);
                }
    
            }
        } catch(err) {
            console.error(`Error for sending message for row ${i}`);
        }
    }
}

const timer = (data) => {
    // Make the bot once the file is parsed
    const bot = new Bot(data);

    setInterval(runner, 5000, data);
}

const execute = () => {
    parser(timer);
}

module.exports = execute;
