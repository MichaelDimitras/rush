/*
* Data model for items scraped from the listing page
*/

class MomentData {
    constructor(url, playerName, setName, seriesName, minPrice, circulationCount) {
        this.url = url;
        this.playerName = playerName;
        this.setName = setName;
        this.seriesName = seriesName;
        this.minPrice = minPrice;
        this.circulationCount = circulationCount;
    }

    printMessage(emoji = null) {
        const msg = `${this.playerName} ${this.setName} series ${this.seriesName} available for $${this.minPrice}`;
        if (emoji) {
            return `${msg} ${emoji}\n${this.url}`
        }
        return `${msg}\n${this.url}`;
    }
}
module.exports = MomentData;