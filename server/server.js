const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const farmerRoute = require('./routes/farmerRoute');
const workerRoute = require('./routes/workerRoute');
const jobRoute = require('./routes/jobRoute');
const paymentRoute = require('./routes/paymentRoute');
const ratingRoute = require('./routes/ratingRoute');
const errorHandler = require('./middlewares/errorHandler');
const userRoute = require('./routes/userRoute');





connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use('/api/farmers', farmerRoute);
app.use('/api/workers', workerRoute);
app.use('/api/jobs', jobRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/ratings', ratingRoute);
app.use('/api/users', userRoute);

//serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  );
}
else 
  {
    app.get('/', (req, res) => res.send("Please set to production"));
  }








app.listen(port, () => console.log(`Example app listening on port ${port}!`.blue.bold));
