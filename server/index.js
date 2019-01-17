const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = `SELECT * FROM products`;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ibiza'
});

app.use(cors());

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.get('/', (req,res) => {
    res.send('working')
});

app.get('/products/add', (req,res) => {
    const { name, price } = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES('${name}', ${price})`;
    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('successfully added product');
        }
    });
});

app.get('/login/get', (req,res) => {
    const { email, password } = req.query;
    const SELECT_USERS_QUERY = `SELECT * FROM users WHERE email = '${email}' and password = '${password}'`;
    connection.query(SELECT_USERS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else if (results.length) {
            return res.send(results);
        }
    });
});

app.get('/register/add', (req,res) => {
    const { first_name, last_name, email, password, created, modified } = req.query;
    const INSERT_USER_QUERY = `INSERT INTO users (first_name, last_name, email, password, created, modified ) 
    VALUES('${first_name}', '${last_name}', '${email}', '${password}', '${created}', '${modified}')`;
    connection.query(INSERT_USER_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send('successfully added user');
        }
    });
});

app.get('/products', (req,res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    })
});

//connection.destroy();

app.listen(4000, () => {
    console.log('server listening to port 4000')
});
