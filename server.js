const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));  


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "feedback_system"
});

db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Failed:", err);
        return;
    }
    console.log("MySQL Connected Successfully");
});

// Prevent GET access on POST route
app.get("/submit-feedback", (req, res) => {
    res.send("Use POST method only.");
});

app.post("/submit-feedback", (req, res) => {
    const { name, email, phone, department, message, subscribe } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const sql = `
        INSERT INTO feedback (name, email, phone, department, message, newsletter)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name,
        email,
        phone,
        department,
        message,
        subscribe ? 1 : 0
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ success: false, message: "Database insert failed" });
        }

        return res.json({ success: true, message: "Feedback inserted" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});






