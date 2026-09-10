const mongoose = require("mongoose");
require("dotenv").config();

let connectionPromise;

function DbConnection() {
  if (!process.env.MONGO_URL) {
    return Promise.reject(
      new Error("MONGO_URL is not configured")
    );
  }

  // Already connected
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  // Connection already in progress
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("DB CONNECTED!");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      connectionPromise = undefined;
      throw error;
    });

  return connectionPromise;
}

module.exports = DbConnection;