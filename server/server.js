const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
const farmerRoute = require('./routes/farmerRoute');
const workerRoute = require('./routes/workerRoute');
const jobRoute = require('./routes/jobRoute');
const errorHandler = require('./middlewares/errorHandler');





connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use('/api/farmers', farmerRoute);
app.use('/api/workers', workerRoute);
app.use('/api/jobs', jobRoute);






app.listen(port, () => console.log(`Example app listening on port ${port}!`.blue.bold));
