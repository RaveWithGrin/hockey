var path = require('path');
var fileName = path.basename(__filename);

module.exports = function(app, logger, api) {
    app.get('/', async function(req, res) {
        var todaysGames = await api.schedule.day(
            //new Date().toISOString().substring(0, 10)
            '2018-09-26'
        );
        if (todaysGames.dates.length > 0)
            todaysGames = todaysGames.dates[0].games;
        else todaysGames = [];
        //var monthsGames = await api.schedule.range('2018-09-01', '2018-09-30');
        res.render('index.ejs', { todaysGames: todaysGames });
    });

    app.get(/^(\/static\/.+)$/, function(req, res) {
        res.sendFile(path.join(__dirname, '../', req.params[0]));
    });

    app.get(/^(\/views\/.+)$/, function(req, res) {
        res.sendFile(path.join(__dirname, '../', req.params[0]));
    });

    app.get(/^(\/images\/.+)$/, function(req, res) {
        res.sendFile(path.join(__dirname, '../', req.params[0]));
    });
};
