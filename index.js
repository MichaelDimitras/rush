const Session = require('./system/session');
const Bot = require('./bot/bot');
const ScraperRunner = require('./businessLogic/scraperRunner');

const startScraper = (session) => {    
    if (session.db && session.db.hasMoments()) {
        const moments = session.db.listMoments();
        const scraperRunner = new ScraperRunner(session, moments);
        setInterval(() => scraperRunner.runScraper(), 1000);
    }
}

const session = new Session();
new Bot(session);
startScraper(session);