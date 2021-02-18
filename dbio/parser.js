const fs = require('fs'); 
const parse = require('csv-parse');
const path = require('path');

const kFilePath = path.join(__dirname, '../shot.csv');

const parseFile = (cb, delimiter = ',') => {
  const fileData = [];

  fs.createReadStream(kFilePath)
      .pipe(parse({delimiter: delimiter}))
      .on('data', (csvrow) => {
        fileData.push(csvrow);        
      })
      .on('error', (err) => {
        console.error(`Error parsing file ${kFilePath}\n${err}`);
      })
      .on('end',() => {
        console.log(`Parsing ${kFilePath} complete`);
        cb(fileData);
      })
};

module.exports = parseFile;