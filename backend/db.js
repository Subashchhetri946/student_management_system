// creating a database connection

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9805",
    database: "student_management_system",
    port: 3307
});

module.exports = connection;