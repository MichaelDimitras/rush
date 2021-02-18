class UrlLog {
    constructor() {
        this.index = new Set();
    }

    addItem(identifier) {
        return this.index.add(identifier);
    }

    hasItem(identifier) {
        return this.index.has(identifier);
    }
}

module.exports = UrlLog;