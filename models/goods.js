let mongoose = require('mongoose');

let goodsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String
    },
    price:{
        type: Number
    },
    rating:{
        type: Number
    },
    discount:{
        type: Number
    }
});

module.exports = mongoose.model('goods', goodsSchema);