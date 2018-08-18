'use strict';
var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var fileName = path.basename(__filename);

module.exports = function(logger, api) {
    var start = function() {
        var app = express();
        var expressWs = require('express-ws')(app);
        var port = process.env.PORT || 8082;

        app.use(
            morgan('dev', {
                stream: {
                    write: function(message) {
                        logger('info', fileName, message.trim());
                    }
                }
            })
        );
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());

        app.set('view engine', 'ejs');

        require('./app/routes.js')(app, logger, api);

        app.listen(port);
        logger('info', fileName, 'The magic happens on port ' + port);
    };

    return {
        start: start
    };
};
