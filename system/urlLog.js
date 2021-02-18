class UrlLog {
    constructor() {
        this.index = new Set();
    }

    toCsv() {
        return Array.from(this.index).toString();
    }

    addItem(identifier) {
        return this.index.add(identifier);
    }

    hasItem(identifier) {
        return this.index.has(identifier);
    }
}

module.exports = UrlLog;