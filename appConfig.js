const express = require('express');
const path = require('path');
const createError = require('http-errors');

const listRouter = require('./routers/listRouter');

const getApp = () => {
    const app = new express();
    configureMiddlewares(app);
    addRoutes(app);   
    addErrorHandlers(app);
    return app; 
}

const configureMiddlewares = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
}

const addRoutes = (app) => {
    app.use('/list', listRouter);

    app.get('/health', (req, res) => {
        console.log('Health check');
        res.sendStatus(200);
    });
};

const addErrorHandlers = (app) => {
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
};

module.exports = getApp;