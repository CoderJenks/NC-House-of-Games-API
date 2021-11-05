const db = require('../db/connection.js');
const format = require('pg-format');
const { forEach } = require('methods');
const { query } = require('../db/connection.js');

exports.dropTable = (tableName) => {
    return db.query(`DROP TABLE IF EXISTS ${tableName};`)
};


exports.checkExists = (table, column, value) => {
    const checkStr = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
    return db.query(checkStr, [value])
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({status:404, msg: `value not found`})
        }
    })
};




// exports.checkKeysValid = (keysArray, table) => {
//     const queryStr = format(`SELECT $1 FROM %I;`, table)
//     const dbOutput = db.query(queryStr,[key]); 
//     