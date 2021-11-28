var arangojs = require('arangojs');
var arangoDbConfig = require('./config')

exports.getArangoDBInstance = function() {
    const db = new arangojs.Database();

    const user = process.env.ARANGO_DB_USER ? process.env.ARANGO_DB_USER : arangoDbConfig.db.user
    const password = process.env.ARANGO_DB_PASSWORD ? process.env.ARANGO_DB_PASSWORD : arangoDbConfig.db.password
    const database = process.env.ARANGO_DB_NAME ? process.env.ARANGO_DB_NAME : arangoDbConfig.db.database

    db.useBasicAuth(user, password)
    db.useDatabase(database)

    return db
}