module.exports = function(logger) {
    var module = function(level, file, message) {
        logger[level]('[' + file + '] ' + message);
    };
    return module;
};
