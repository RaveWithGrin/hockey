var winston = require('winston');
var path = require('path');

var fileName = path.basename(__filename);
var myFormat = winston.format.printf(function(info) {
    return `${info.timestamp} ${info.level.toUpperCase()} ${info.message}`;
});

var winstonLogger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), myFormat),
    transports: [new winston.transports.Console()],
    level: 'debug'
});
var logger = require('./logger')(winstonLogger);
var api = require('./api')(logger);
var webserver = require('./webserver')(logger, api);
webserver.start();

var test = async function() {
    var todaysGames = await api.schedule.day('2018-09-26');
    console.log(JSON.stringify(todaysGames.dates[0].games[0], null, 2));
};

//test();

process.on('unhandledRejection', function(error) {
    console.error(error);
    process.exit(1);
});
