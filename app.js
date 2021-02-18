const express = require('express');
const path = require('path');
const app = new express();
const fs = require('fs');
const parse = require('csv-parse');
const newRelic = require('newrelic');

const createError = require('http-errors');

const runner = require('./businessLogic/runner');
runner();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


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

app.use('/list', listRouter);
app.get('/health', (req, res) => res.send(200));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
});

app.listen(process.env.PORT || 8000);

module.exports = app;