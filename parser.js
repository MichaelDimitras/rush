const fs = require('fs'); 
const parse = require('csv-parse');

const parseFile = (fileName, cb, delimiter = ',') => {
  const fileData = [];

  fs.createReadStream(fileName)
      .pipe(parse({delimiter: delimiter}))
      .on('data', (csvrow) => {
        fileData.push(csvrow);        
      })
      .on('error', (err) => {
        console.error(`Error parsing file ${fileName}\n${err}`);
      })
      .on('end',() => {
        console.log(`Parsing ${fileName} complete`);
        cb(fileData);
      })
}

module.exports = parseFile;