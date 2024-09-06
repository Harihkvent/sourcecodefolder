// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Harihk@24',  // replace with your MySQL root password
    database: 'expert_connect'
authPlugins: {
    caching_sha2_password: require('mysql2/lib/auth_plugins/caching_sha2_password')
}

});

const mysql = require('mysql2');


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// User Registration
app.post('/register-user', (req, res) => {
    const { name, email, password, mobile } = req.body;
    const sql = `INSERT INTO users (name, email, password, mobile) VALUES (?, ?, ?, ?)`;

    db.query(sql, [name, email, password, mobile], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: "User registered successfully!", id: result.insertId });
    });
});

// Expert Registration
app.post('/register-expert', (req, res) => {
    const { name, email, password, service } = req.body;
    const sql = `INSERT INTO experts (name, email, password, service) VALUES (?, ?, ?, ?)`;

    db.query(sql, [name, email, password, service], (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ message: "Expert registered successfully!", id: result.insertId });
    });
});

// User Login
app.post('/login-user', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json({ message: "Login successful!", user: results[0] });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

// Expert Login
app.post('/login-expert', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM experts WHERE email = ? AND password = ?`;

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json({ message: "Login successful!", expert: results[0] });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
