const db = require('../db/connection.js');
const format = require('pg-format');
const { forEach } = require('methods');
const { query } = require('../db/connection.js');

exports.dropTable = (tableName) => {
    return db.query(`DROP TABLE IF EXISTS ${tableName};`)
};



// exports.checkExists = async (table, column, value) => {
//     const queryStr = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
//     const dbOutput = await db.query(queryStr, [value]);

//     if(dbOutput.rows.length === 0){
//         return Promise.reject({status:404, msg: "Resource not found"})
//     }
// };




// exports.checkKeysValid = (keysArray, table) => {
//     const queryStr = format(`SELECT $1 FROM %I;`, table)
//     const dbOutput = db.query(queryStr,[key]); 
//     