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

// adding student and saving
app.post("/students", (req, res) => {
    const { name, email, department, phone, date, roll} = req.body;

    const userSql =
    "Insert INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')";
db.query(userSql, [name, email, "student123"], (err, userResult) => {
    if(err) {
        console.log("GET STUDENTS FULL ERROR: ", err);
        return res.status(500).json({
            success: false, 
            message: err.sqlMessage || err.message
        });
    }
    const userId = userResult.insertId;
    const studentSql = `
    INSERT INTO students(user_id, roll_no, department, phone, enrollment_date)
    VALUES(?, ?, ?, ?, ?)
`;

    db.query(studentSql, [userId, roll, department, phone, date], (err2) => {
            if(err2) {
                console.log("STUDENT INSERT ERROR: ",err2);
                return res.status(500).json({ 
                    success: false,
                    message: err2.sqlMessage
                }); 
            }
            res.json( {
                success: true,
                message: "Student added successfully"
            });
        })

});
});


app.get("/students", (req, res) => {
    const sql = `SELECT s.id,
     u.name, 
     u.email,
     s.roll_no,
     s.department, 
     s.phone, 
     s.enrollment_date
    FROM students AS s
    INNER JOIN users AS u
    ON s.user_id = u.id
    ORDER BY s.id DESC`;

    db.query(sql, (err, results) => {
        if(err) {
            console.log("GET STUDETNS ERROR: ",err.sqlMessage);
            return res.status(500).json({
                success:false,
                message: err.sqlMessage
            });
        }
        res.json(results);
    });
});

app.delete("/students/:id", (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM students WHERE id = ?", [id], (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.sqlMessage
            });
        }

        res.json({
            success: true,
            message: "Student deleted successfully"
        });
    });

});

app.get("/", (req, res) => {
    res.send("Student Management System backend is running");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});

