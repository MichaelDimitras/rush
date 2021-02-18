
const converter = require('../../dbio/csvConverter');

const topShotUrlRegex = /(https:\/\/www.nbatopshot.com\/listings\/p2p\/)/;

const isTopShot = (string) => {
    return topShotUrlRegex.test(string);
}

const addHandler = (args, data) => {
    if (args.length !== 3) {
        return `ERROR: The check command should look like '!add [price] [url]'`;
    } 

    const price = args[1];

    if (Number.isNaN(parseInt(price))) {
        return `ERROR: couldn't parse price ${price}. Make sure you put a number here`;
    }

    const url = args[2];

    if (!typeof url === 'string') {
        return `ERROR: couldn't parse url ${url}.`;
    }

    if (!isTopShot(url)) {
        return `ERROR: not a Top Shot listing url. It should start with 'https://www.nbatopshot.com/listings/p2p/'`;
    }
    
    for (let i = 0; i < data.length; i++) {            
        if(data[i][1] === url) {               
            data[i][0] = price;
            updateCsv(data);
            return `Listing updated successfully`;
        } else {
            data.push([price, url]);
            updateCsv(data);
            return `New top shot added`;
        }
    }

    return `Listing failed to update`;
}

const updateCsv = (data) => {
    const csvConverter = new converter(data);
    csvConverter.saveFile(() => console.log(`File saved successfully`));
};

module.exports = addHandler;