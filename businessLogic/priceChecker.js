/*
* Given a url, a target price and a callback,
* scrape the page at that url and run the callback if 
* the page shows a lower price than the target price
*/
const rp = require('request-promise');
const RegexHelper = require('../util/regexHelper');

class PriceChecker {
    constructor() {

    }
    
    static checkPricesForUrl = (url, targetPrice, success) => {
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
                    const price = RegexHelper.getPrice(html);
                    let priceNum = parseInt(price);
                    if (Number.isNaN(priceNum)) {
                        console.error('error parsing min amount for ' + url)
                    } else {
                        if (priceNum <= targetPrice) {
                            success(html, price, url);
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
}
module.exports = PriceChecker;