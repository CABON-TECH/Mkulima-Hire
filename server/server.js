const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const farmerRoute = require('./routes/farmerRoute');
const errorHandler = require('./middlewares/errorHandler');





connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use('/api/farmers', farmerRoute);






app.listen(port, () => console.log(`Example app listening on port ${port}!`.blue.bold));
