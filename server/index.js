const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = `SELECT * FROM products`;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ibiza'
});

const pool  = mysql.createPool({
    connectionLimit : 10,
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
