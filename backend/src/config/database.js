const mongoose = require("mongoose");
const logger = require("../utils/logger");
const env = require("./env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("📡 MongoDB connected successfully");
  } catch (err) {
    logger.error(`❌ Error connecting to MongoDB: ${err.message || err}`);
    if (err.stack) logger.debug(err.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
