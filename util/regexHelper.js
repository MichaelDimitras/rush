const topShotUrlRegex = /(https:\/\/www.nbatopshot.com\/listings\/p2p\/)/;
const priceRegex = /"PriceRange","min":"(\d+)/;
const playerNameRegex = /"playerName":"([^"]+)/;
const setNameRegex = /"flowName":"([^"]+)/;
const seriesNameRegex = /"flowSeriesNumber":(\d+)/;
const circulationCountRegex = /"circulationCount":(\d+)/;

class RegexHelper {
    constructor() {

    }

    static isTopShot(string) {
        return topShotUrlRegex.test(string);
    }
    
    static getPrice(source) {
        return getRegexMatchGroup(priceRegex, source);
    }
    
    static getPlayerName(source) {
        return getRegexMatchGroup(playerNameRegex, source);
    }
    
    static getSetName(source) {
        return getRegexMatchGroup(setNameRegex, source);
    }
    
    static getSeriesName(source) {
        return getRegexMatchGroup(seriesNameRegex, source);
    }
    
    static getCirculationCount(source) {
        return getRegexMatchGroup(circulationCountRegex, source);
    }

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

module.exports = RegexHelper;