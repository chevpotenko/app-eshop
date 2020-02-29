const mongoose = require('mongoose');

const filtersSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    values: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('filters', filtersSchema);
