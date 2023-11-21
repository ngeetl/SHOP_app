const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId, // mongoDB에서 자동으로 할당되는 고유ID
        ref: 'User'
    },
    title: {
        type: String,
        maxLength:30  
    },
    description: String,
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

