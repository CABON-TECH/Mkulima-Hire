const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');



connectDB();




app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`.blue.bold));
