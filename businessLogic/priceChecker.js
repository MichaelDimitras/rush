const rp = require('request-promise');
const $ = require('cheerio');

const MomentData = require('./data/momentData');
const getEmoji = require('./data/emoji');

const priceRegex = /"PriceRange","min":"(\d+)/;
const playerNameRegex = /"playerName":"([^"]+)/;
const setNameRegex = /"flowName":"([^"]+)/;
const seriesNameRegex = /"flowSeriesNumber":(\d+)/;
const circulationCountRegex = /"circulationCount":(\d+)/;

const checkPricesForUrl = (url, targetPrice, success, failure = null) => {
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
                        const playerName = getRegexMatchGroup(playerNameRegex, html);
                        const setName = getRegexMatchGroup(setNameRegex, html);
                        const seriesName = getRegexMatchGroup(seriesNameRegex, html);
                        const circulationCount = getRegexMatchGroup(circulationCountRegex, html);
                        const moment = new MomentData(url, playerName, setName, seriesName, price, circulationCount);

                        const emoji = getEmoji();
                        const msg = moment.printMessage(emoji);
                        success(msg);
                    } else {
                        if (failure) {
                            failure(moment);
                        }
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