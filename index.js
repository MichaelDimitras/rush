const parser = require('./parser');
const priceChecker = require('./priceChecker');
const sendMessage = require('./messenger');
const UrlLog = require('./urlLog');

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
                //cb is message function
                const targetPrice = data[i][0];
                const url = data[i][1];
    
                if (urlLog.hasItem(url)) {
                    console.log(`Message already sent for ${url}`);
                } else {
                    priceChecker(data[i][1], data[i][0], sendMessage);
                    urlLog.addItem(url);
                }
    
            }
        } catch(err) {
            console.error(`Error for sending message for row ${i}`);
        }
    }
}

const timer = (data) => {
    setInterval(runner, 5000, data);
}

parser('shot.csv', timer);