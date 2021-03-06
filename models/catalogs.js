const mongoose = require('mongoose');

const catalogsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: String,
    },
    img: {
        type: String,
    }
});

module.exports = mongoose.model('catalogs', catalogsSchema);
