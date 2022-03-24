const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/yaaria_development');

const db = mongoose.connection;


db.on('error', console.error.bind(console, "error connecting to mongoose."));

db.once('open', function(){
    console.log('Connected to database :: MongoDB');
});

module.exports = db;
