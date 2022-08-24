const mysql = require('mysql2/promise');
const datacns = require('./datamysql');

const mysqlConnection = mysql.createPool(datacns.cns);

module.exports = mysqlConnection;
