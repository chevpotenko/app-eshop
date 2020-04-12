const mongoose = require('mongoose');

const pagesSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },
});

module.exports = mongoose.model('pages', pagesSchema);
