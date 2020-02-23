let mongoose = require('mongoose');

let productsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String
    },
    img:{
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

module.exports = mongoose.model('products', productsSchema);
