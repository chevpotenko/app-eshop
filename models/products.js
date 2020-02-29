const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    sizes: {
        type: Array
    },
    brand: {
        type: String
    },
    colors: {
        type: Array
    },
    rating: {
        type: Number
    },
    discount: {
        type: Number
    },
    images: {
        type: Array
    }
});

module.exports = mongoose.model('products', productsSchema);
