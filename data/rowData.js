class RowData {
    constructor(row) {
        this.url = row[1];
        this.targetPrice = row[0];
    }
}
module.exports = RowData;