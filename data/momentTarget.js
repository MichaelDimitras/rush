/*
* Data model for the items stored in our db
*/

const RegexHelper = require('../util/regexHelper');

class MomentTarget {
    constructor(url, targetPrice) {
        checkParams(url, targetPrice);
        this.url = url;
        this.targetPrice = targetPrice;
    }
}

const checkParams = (url, targetPrice) => {
    if (!RegexHelper.isTopShot(url)) {
        throw (`Unable to construct MomentTarget with url ${url}`);
    }
    if(Number.isNaN(parseInt(targetPrice))) {
        throw (`Unable to construct MomentTarget with targetPrice ${targetPrice}`);
    }
}
module.exports = MomentTarget;