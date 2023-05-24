const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB