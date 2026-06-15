// testing the connection

const express = require("express");
const db = require("./db");

const app = express();

db.connect(err => {
    if(err) {
        console.log(err);
    } else {
        console.log("MySQL Connected sucessfully")
    }
})

app.listen(5000, () => {
    console.log("Server Running");
});