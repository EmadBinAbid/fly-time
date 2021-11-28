var arangojs = require('arangojs');
var aql = arangojs.aql

var dbManager = require('../../db/arangodb/manager')

exports.getFlightsWithLowestTravelTime = function(fromAirport, toAirport, dateOfTravel) {
    const db = dbManager.getArangoDBInstance()

    const from = `airports/${fromAirport}`
    const to = `airports/${toAirport}`

    const date = dateOfTravel.split('/')
    const year = parseInt(date[0])
    const month = parseInt(date[1])
    const day = parseInt(date[2])

    // The inspiration of this query is taken from ArangoDB's official documentation here: 
    // https://www.arangodb.com/learn/graphs/pattern-matching/
    const query = `
                    FOR v, e, p IN 2 OUTBOUND @from flights
                    FILTER v._id == @to
                    FILTER p.edges[*].Year ALL == @year
                    FILTER p.edges[*].Month ALL == @month
                    FILTER p.edges[*].Day ALL == @day
                    FILTER DATE_ADD(p.edges[0].ArrTimeUTC, 20, 'minutes') < p.edges[1].DepTimeUTC
                    LET flightTime = DATE_DIFF(p.edges[0].DepTimeUTC, p.edges[1].ArrTimeUTC, 'i')
                    SORT flightTime ASC
                    LIMIT 10
                    RETURN { flight: p, time: flightTime }
                    `
    const bindVars = {
        from: from,
        to: to,
        year: year,
        month: month,
        day: day
    }
    

    return db.query(query, bindVars)
    .then((cursor) => {
        return cursor.next().then(function(result) {
          return result
        });
      })
    .catch((err) => {
      console.log(`[ERROR] ${err}`)
        return err
    })
}