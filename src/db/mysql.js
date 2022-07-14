const mysql = require('mysql')
const util = require('util');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

conn.connect((err) => {
    if(err) throw err;
    console.log("Mysql Connected")
})

// node native promisify
const query = util.promisify(conn.query).bind(conn);

module.exports = query





