const dotenv = require("dotenv");
const mongoose = require("mongoose");

// chạy config để dùng env
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
