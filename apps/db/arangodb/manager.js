var arangojs = require('arangojs');
var arangoDbConfig = require('./config')

exports.getArangoDBInstance = function() {
    const host = process.env.ARANGO_DB_HOST ? process.env.ARANGO_DB_HOST : arangoDbConfig.db.host
    const port = process.env.ARANGO_DB_PORT ? process.env.ARANGO_DB_PORT : arangoDbConfig.db.port
    const url = `${host}/${port}`

    const db = new arangojs.Database({
        url: url
    });

    const user = process.env.ARANGO_DB_USER ? process.env.ARANGO_DB_USER : arangoDbConfig.db.user
    const password = process.env.ARANGO_DB_PASSWORD ? process.env.ARANGO_DB_PASSWORD : arangoDbConfig.db.password
    const database = process.env.ARANGO_DB_NAME ? process.env.ARANGO_DB_NAME : arangoDbConfig.db.database

    db.useBasicAuth(user, password)
    db.useDatabase(database)

    return db
}