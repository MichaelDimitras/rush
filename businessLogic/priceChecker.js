const rp = require('request-promise');

const MomentData = require('../data/momentData');
const getEmoji = require('../data/emoji');

const priceRegex = /"PriceRange","min":"(\d+)/;
const playerNameRegex = /"playerName":"([^"]+)/;
const setNameRegex = /"flowName":"([^"]+)/;
const seriesNameRegex = /"flowSeriesNumber":(\d+)/;
const circulationCountRegex = /"circulationCount":(\d+)/;

const checkPricesForUrl = (url, targetPrice, success) => {
    if (!typeof url === 'string') {
        console.log(`checkPricesForUrl expected string url, instead got ${typeof url}`);
        return;
    }
    if (!typeof targetPrice === 'string') {
        console.log(`checkPricesForUrl expected string targetPrice, instead got ${typeof targetPrice}`);
        return;
    }

    rp(url)
        .then((html) => {
            if (html) {
                let price = getRegexMatchGroup(priceRegex, html);
                let priceNum = parseInt(price);
                if (Number.isNaN(priceNum)) {
                    console.error('error parsing min amount for ' + url)
                } else {
                    if (priceNum <= targetPrice) {
                        const msg = generateMessage(html, price, url)
                        success(msg);
                    }
                }
            } else {
                console.log("No html found for: " + url);
            }
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

const generateMessage = (html, price, url) => {
    const playerName = getRegexMatchGroup(playerNameRegex, html);
    const setName = getRegexMatchGroup(setNameRegex, html);
    const seriesName = getRegexMatchGroup(seriesNameRegex, html);
    const circulationCount = getRegexMatchGroup(circulationCountRegex, html);
    const moment = new MomentData(url, playerName, setName, seriesName, price, circulationCount);

    const emoji = getEmoji();
    const msg = moment.printMessage(emoji);

    return msg;
}

const getRegexMatchGroup = (regex, source) => {
    const matchResult = source.match(regex);
    if (!matchResult) {
        console.log(`No match found for ${regex}`)
        return '[err]';
    }

    else {
        return matchResult[1];
    }
}

module.exports = checkPricesForUrl;