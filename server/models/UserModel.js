const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  id: String,
  name: String,
  email: String,
})

module.exports = mongoose.model("User", user);