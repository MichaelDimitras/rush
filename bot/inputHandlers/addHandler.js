const RegexHelper = require('../../util/regexHelper');

const addHandler = (args, db) => {
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

    if (!RegexHelper.isTopShot(url)) {
        return `ERROR: not a Top Shot listing url. It should start with 'https://www.nbatopshot.com/listings/p2p/'`;
    }

    if (db.saveMoment(url, price)) {
        return `Listing updated successfully`;
    }

    return `Failed to update listing`;
}

module.exports = addHandler;