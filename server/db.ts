import * as bluebird from "bluebird";
import mongoose = require("mongoose");
mongoose.Promise = bluebird;

// NOTE: FOR DEMO PURPOSES ONLY
const { DB_URL = "mongodb://localhost:27017/bonsai-fayadh-db" } = process.env;

export const connectToDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(DB_URL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    mongoose.set("debug", true);
  } catch (e) {
    console.log("Failed to connect to MongoDB", e);
  }
};

export default connectToDB;
