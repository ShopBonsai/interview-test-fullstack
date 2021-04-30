import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  name: String,
  merchantId: String,
});

const merchantSchema = new Schema({
  logo: String,
  publishedState: Boolean,
  merchant: String,
  commissionFee: String,
  contactEmail: String,
  phone: String,
  address: String,
  publishedDate: String,
  publishedBy: {
    userId: String,
  },
  companyDescription: String,
  brands: [brandSchema],
});

const productSchema = new Schema({
  belongsToBrand: String,
  id: String,
  name: String,
  price: Number,
  description: String,
  color: String,
  size: String,
  quantity: Number,
  image: String,
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
});

merchantSchema.index({ merchant: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const Product = model("Product", productSchema);
const Merchant = model("Merchant", merchantSchema);
const User = model("User", userSchema);

export default { Product, Merchant, User };
