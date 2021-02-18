const { convertArrayToCSV } = require('convert-array-to-csv');
const fs = require('fs');

const path = require('path');
const kFilePath = path.join(__dirname, '../shot.csv');

class Converter {
    constructor(data) {
        this.header = getHeaderRow(data);
        this.data = getDataRows(data);
    }
    
    saveFile(success, failure = null) {
        const csvFromArrayOfArrays = convertArrayToCSV(this.data, {
            header: this.header,
            separator: ','
        });

        const cb = (err, data) => {
            if (err) {
                console.log(`Failure writing csv file`);
                if (failure) {
                    failure();
                }
            } else {
                success();
            }
        }

        fs.writeFile(kFilePath, csvFromArrayOfArrays, cb);
    }
}

getHeaderRow = (data) => {
    return data[0];
}

getDataRows = (data) => {
    return data.slice(1);
}

module.exports = Converter;