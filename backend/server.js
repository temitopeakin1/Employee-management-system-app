const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection ({
    host: 'localhost',
    user: "root",
    password: "",
    database: "register"
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (name, email, password, repeatPassword) VALUES (?, ?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password, req.body.repeatPassword];
    
    db.query(sql, [values], (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).json({ error: "Registration failed" });
        }
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log('Server started');
})