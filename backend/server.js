const connectDB = require("./src/config/database");
const app = require("./src/app");
const logger = require("./src/utils/logger");
const env = require("./src/config/env");

const PORT = env.PORT || 3000;

// Connect to Database
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${PORT}`);
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  process.exit(1);
});
