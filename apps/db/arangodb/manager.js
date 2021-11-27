var arangojs = require('arangojs');
var arangoDbConfig = require('./config')

exports.getArangoDBInstance = function() {
    const db = new arangojs.Database();

    const user = process.env.ARANGO_DB_USER ? process.env.ARANGO_DB_USER : arangoDbConfig.db.user
    const password = process.env.ARANGO_DB_PASSWORD ? process.env.ARANGO_DB_PASSWORD : arangoDbConfig.db.password

    db.useBasicAuth(user, password)
    db.useDatabase(arangoDbConfig.db.database)

    return db
}