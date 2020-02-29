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
    images: {
        type: Array
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    discount: {
        type: Number
    }
});

module.exports = mongoose.model('products', productsSchema);
