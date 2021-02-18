const getApp = require('./appConfig');
const runner = require('./businessLogic/runner');

runner();

const app = getApp();
app.listen(process.env.PORT || 8000);

module.exports = app;