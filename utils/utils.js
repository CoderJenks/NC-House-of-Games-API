const db = require('../db/connection.js');

exports.dropTable = (tableName) => {
    return db.query(`DROP TABLE IF EXISTS ${tableName};`)
}