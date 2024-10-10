const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
    }catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;