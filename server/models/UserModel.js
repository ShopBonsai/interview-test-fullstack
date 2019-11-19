const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  userId: String,
  name: String,
  email: String,
  likedProducts: [{id: String}]
});

module.exports = mongoose.model("User", user);
