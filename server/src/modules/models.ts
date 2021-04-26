import { Schema, model } from 'mongoose';

const brandSchema = new Schema({
    name: String,
    merchantId: String,
})

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
        userId: String
    },
    companyDescription: String
})

const productSchema = new Schema({
    belongsToBrand: String,
    id: String,
    name: String,
    price: Number,
    description: String,
    color: String,
    size: String,
    quantity: Number,
    image: String
})

merchantSchema.index({ merchant: 1 }, { unique: true });

const Brand = model('Brand', brandSchema);
const Product = model('Product', productSchema);
const Merchant = model('Merchant', merchantSchema);

export default  { Brand, Product, Merchant }