const parse = require('csv-parse');

const listRouter = (req, res) => {
    const filePath = path.join(__dirname, 'shot.csv');
    const readStream = fs.createReadStream(filePath).pipe(parse({delimiter: ','}));

    let output = [];
    readStream.on('data', (data) => {
        output.push(data);
    });
    
    readStream.on('end', () => {
        const resString = output.join('<br>');
        res.send(resString);
    });
}

module.exports = listRouter;