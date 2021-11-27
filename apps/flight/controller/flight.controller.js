var express = require('express');

var routes = require('../route/flight.route').flightRoutes
var app = require('../server/flight.server').getAppInstance()

//Middlewares
app.use(express.json());


app.get(routes.getLowestTravelTimeFlights, (req, res) => {
    res.json([])
});