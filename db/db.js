const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);

const db = mongoose.connection;

db.once('open', function() {
    console.log('Connected to Mongo db');
});

db.on('error', function(err) {
    console.log(err);
});

module.exports = function() {
    return mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
};
