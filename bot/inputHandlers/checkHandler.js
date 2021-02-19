/*
* Handle input for our 'check' command
* Given a url, return the price of the item at that url
* if its in the database
*/
const RegexHelper = require('../../util/regexHelper');

const checkHandler = (args, db) => {
    if (args.length !== 2) {
        return `ERROR: The check command should look like '!check [url]'`;
    }

    const url = args[1];

    if (!typeof url === 'string') {
        return `ERROR: couldn't parse url ${url}.`;
    }

    if (!RegexHelper.isTopShot(url)) {
        return `ERROR: not a Top Shot listing url. It should start with 'https://www.nbatopshot.com/listings/p2p/'`;
    }

    const moment = db.getMoment(url);
    if (moment) {
        return `\nTarget price: ${moment.targetPrice}`
    } else {
        return `\n no listing found for that url`;
    }
}

module.exports = checkHandler;