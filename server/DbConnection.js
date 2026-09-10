const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let connectionPromise;

function DbConnection() {
  if (!process.env.MONGO_URL) {
    return Promise.reject(new Error("MONGO_URL is not configured"));
  }

  if (mongoose.connection.readyState === 1) {
    return Promise.resolve();
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URL)
      .then(() => console.log("DB CONNECTED!"))
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
}

module.exports = DbConnection;