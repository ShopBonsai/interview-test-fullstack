const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  belongsToBrand: Number,
  id: String,
  name: String,
  price: Number,
  description: String,
  color: String,
  size: String,
  quantity: Number,
  image: String,
  merchant: { type: Schema.Types.ObjectId, ref: "Merchant" }
});

module.exports = mongoose.model("Product", product);
