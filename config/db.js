const mongoose = require("mongoose");
require('dotenv').config()
const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true });

    console.log("MongoDB Database connected!!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
