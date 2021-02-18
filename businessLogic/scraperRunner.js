/*
* Given a collection of urls and price pairs, run the scraper for each one
* with a messaging callback that runs when a low price is found
*/
const Messenger = require('./messenger');
const PriceChecker = require('./priceChecker');

class ScraperRunner{
    constructor(session, data) {
        this.session = session;
        this.data = data;
    }

    runScraper() {
        for (const [key, value] of Object.entries(this.data)) {
            try {
                    if(!(value instanceof Object)) {
                        console.error(`Data for ${key} of data is not an object. Intead it is ${value.constructor ? value.constructor : typeof value}`);
                        continue;
                    } else {
                        if(!value.url || !value.targetPrice) {
                            console.error(`Missing data for ${key}. Got ${value}`);
                            continue;
                        }
                        else if (Number.isNaN(parseInt(value.targetPrice))) {
                            console.error(`Target price for ${key} not a number`);
                            continue;
                        }
                        else if (this.session.urlLog.hasItem(value.url)) {
                            continue;
                        } else {
                            if (this.session.isProd()) {
                                const messenger = new Messenger(this.session.webHookUrl);
                                PriceChecker.checkPricesForUrl(value.url, value.targetPrice, (html, price, url) => messenger.generateAndSendMessage(html, price, url));
                            } else {
                                PriceChecker.checkPricesForUrl(value.url, value.targetPrice, (html, price, url) => console.log("Message sent", url, price));
                            }                    
                            this.session.urlLog.addItem(value.url);
                        }
            
                    }
                } catch(err) {
                    console.error(`Error scraping ${key}: ${err}`);
                }
        }
    }
}

module.exports = ScraperRunner;