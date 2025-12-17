const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔥 Connected to MongoDB");
  } catch (error) {
    console.log("❌ Mongo connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
