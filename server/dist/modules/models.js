"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var brandSchema = new mongoose_1.Schema({
    name: String,
    merchantId: String,
});
var merchantSchema = new mongoose_1.Schema({
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
    brands: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'brand',
        }],
}, { timestamps: true });
var productSchema = new mongoose_1.Schema({
    belongsToBrand: String,
    belongsToMerchant: String,
    id: String,
    name: String,
    price: Number,
    description: String,
    color: String,
    size: String,
    quantity: Number,
    image: String,
}, { timestamps: true });
var userSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    role: String,
}, { timestamps: true });
merchantSchema.index({ merchant: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
brandSchema.index({ name: 1 }, { unique: true });
var Product = mongoose_1.model('product', productSchema);
var Brand = mongoose_1.model('brand', brandSchema);
var Merchant = mongoose_1.model('merchant', merchantSchema);
var User = mongoose_1.model('user', userSchema);
exports.default = { Product: Product, Merchant: Merchant, Brand: Brand, User: User };
//# sourceMappingURL=models.js.map