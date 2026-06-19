// testing the connection

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

db.connect(err => {
    if(err) {
        console.log(err);
    } else {
        console.log("MySQL Connected sucessfully");
    }
})

app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')";
    db.query(sql, [name, email, password], (err, result) => {
        if(err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Signup failed"
            });
        }

        res.json({
            success: true, 
            message: "Student account created successfully"
        });
    });
});

app.post("/login", (req, res) => {
    const { name, email, password } = req.body;

    const sql = "SELECT id, name, role FROM users WHERE email = ? AND password = ?";
    db.query(sql, [ email, password], (err, result) => {
        if(err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Login failed"
            });
        }
        if(result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        res.json({
            success: true, 
            message: "Login created successfully",
            user: result[0]
        });
    });
});

app.listen(5000, () => {
    console.log("Server Running");
});