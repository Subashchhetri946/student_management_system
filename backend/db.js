// creating a database connection

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    user: "sql7831857",
    password: "kyAgUBWZSk",
    database: "sql7831857",
    port: 3306
});

module.exports = connection;