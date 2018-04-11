let mongoose = require('mongoose');

let bannerSchema = mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('banners', bannerSchema);