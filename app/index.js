const restify = require('restify');
const config = require('./config');

const app = module.exports = restify.createServer();

// Midleware
app.use(restify.plugins.bodyParser());

// Get routers here
require('./routers/index')(app);

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
});

module.exports.app = app;