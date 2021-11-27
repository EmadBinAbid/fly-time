var express = require('express');

var routes = require('../route/flight.route').flightRoutes
var app = require('../server/flight.server').getAppInstance()
var flightService = require('../service/flight.service')

//Middlewares
app.use(express.json());


app.get(routes.getLowestTravelTimeFlights, (req, res) => {
    // TODO: validate the request payload and make sure all fields are present

    flightService.getFlightsWithLowestTravelTime(req.body.from, req.body.to, req.body.date)
    .then((result) => {
        // no record found
        if (result == null || result == undefined) {
            res.json({})
        }
        res.json(result)
    })
    .catch((err) => {
        res.json({
            "error": err
        })
    })
});