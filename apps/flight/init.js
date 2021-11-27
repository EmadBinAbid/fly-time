exports.registerServer = function() {
    require('./server/flight.server')
}

exports.registerControllers = function() {
    require('./controller/flight.controller')
}