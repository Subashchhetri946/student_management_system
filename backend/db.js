// creating a database connection

const mysql = require("myslq2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9805",
    database: "student_management_system"
});

module.exports = connection;