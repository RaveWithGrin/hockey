var request = require('request-promise');
var path = require('path');

var fileName = path.basename(__filename);

module.exports = function(logger) {
    var callApi = async function(param) {
        var url = 'https://statsapi.web.nhl.com/api/v1/' + param;
        logger('debug', fileName, 'API URL: ' + url);
        var result = await request.get(url);
        return JSON.parse(result);
    };

    var teams = {
        get: async function() {
            return await callApi('teams');
        },
        roster: async function(teamId) {
            return await callApi('teams/' + teamId + '?expand=team.roster');
        },
        nextGame: async function(teamId) {
            return await callApi(
                'teams/' + teamId + '?expand=team.schedule.next'
            );
        },
        prevGame: async function(teamId) {
            return await callApi(
                'teams/' + teamId + '?expand=team.schedule.previous'
            );
        },
        stats: async function(teamId) {
            return await callApi('teams/' + teamId + '/stats');
        }
    };

    var divisions = async function() {
        return await callApi('divisions');
    };

    var conferences = async function() {
        return await callApi('conferences');
    };

    var player = {
        get: async function(playerId) {
            return await callApi('people/' + playerId);
        },
        seasonStats: async function(playerId, season) {
            return await callApi(
                'people/' +
                    playerId +
                    '?stats=statsSingleSeason&season=' +
                    season
            );
        },
        homeAwayStats: async function(playerId, season) {
            return await callApi(
                'people/' + playerId + '?stats=homeAndAway&season=' + season
            );
        },
        monthlyStats: async function(playerId, season) {
            return await callApi(
                'people/' + playerId + '?stats=byMonth&season=' + season
            );
        },
        dailyStats: async function(playerId, season) {
            return await callApi(
                'people/' + playerId + '?stats=byDayOfWeek&season=' + season
            );
        },
        divisionStats: async function(playerId, season) {
            return await callApi(
                'people/' + playerId + '?stats=vsDivision&season=' + season
            );
        },
        conferenceStats: async function(playerId, season) {
            return await callApi(
                'people/' + playerId + '?stats=vsConference&season=' + season
            );
        },
        teamStats: async function(playerId, season) {
            return await callApi(
                'people/' + playerId + '?stats=vsTeam&season=' + season
            );
        },
        gameStats: async function(playerId, season) {
            return await callApi(
                'people/' + playerId + '?stats=gameLog&season=' + season
            );
        },
        regularSeasonStats: async function(playerId, season) {
            return await callApi(
                'people/' +
                    playerId +
                    '?stats=regularSeasonStatRankings&season=' +
                    season
            );
        },
        goalSituationStats: async function(playerId, season) {
            return await callApi(
                'people/' +
                    playerId +
                    '?stats=goalByGameSituation&season=' +
                    season
            );
        },
        onPaceStats: async function(playerId, season) {
            return await callApi(
                'people/' +
                    playerId +
                    '?stats=onPaceRegularSeason&season=' +
                    season
            );
        }
    };

    var game = {
        /*
         * The first 4 digits identify the season of the game (ie. 2017 for the 2017-2018 season). 
         * The next 2 digits give the type of game, where 01 = preseason, 02 = regular season, 03 = playoffs, 04 = all-star. 
         * The final 4 digits identify the specific game number. 
         * For regular season and preseason games, this ranges from 0001 to the number of games played. (1271 for seasons with 31 teams (2017 and onwards) and 1230 for seasons with 30 teams). 
         * For playoff games, the 2nd digit of the specific number gives the round of the playoffs, the 3rd digit specifies the matchup, and the 4th digit specifies the game (out of 7).
        */
        liveFeed: async function(gameId) {
            return await callApi('game/' + gameId + '/feed/live');
        },
        boxScore: async function(gameId) {
            return await callApi('game/' + gameId + '/boxscore');
        },
        content: async function(gameId) {
            return await callApi('game/' + gameId + '/content');
        }
    };

    var schedule = {
        day: async function(date, teamId) {
            var param =
                'schedule?expand=schedule.broadcasts&expand=schedule.linescore&expand=schedule.ticket&date=' +
                date;
            if (teamId) param += '&teamId=' + teamId;
            return await callApi(param);
        },
        range: async function(startDate, endDate, teamId) {
            var param =
                'schedule?expand=schedule.broadcasts&expand=schedule.linescore&expand=schedule.ticket&startDate=' +
                startDate +
                '&endDate=' +
                endDate;
            if (teamId) param += '&teamId=' + teamId;
            return await callApi(param);
        }
    };

    var standings = {
        season: async function(season) {
            return await callApi(
                'standings?season=' + season + '&expand=standings.record'
            );
        },
        date: async function(data) {
            return await callApi(
                'standings?date=' + date + '&expand=standings.record'
            );
        }
    };

    var types = {
        standings: async function() {
            return awaitCallApi('standingsTypes');
        },
        stats: async function() {
            return awaitCallApi('statTypes');
        }
    };

    var generic = async function(param) {
        return await callApi(param);
    };

    return {
        teams: teams,
        divisions: divisions,
        conferences: conferences,
        player: player,
        game: game,
        schedule: schedule,
        standings: standings,
        types: types,
        generic: generic
    };
};
