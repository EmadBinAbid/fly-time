var flightApp = require('./flight/init')


exports.initServers = function() {
    flightApp.registerServer()
}

exports.initControllers = function() {
    flightApp.registerControllers()
}