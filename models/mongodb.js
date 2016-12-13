// Created by xuziru on 2016/12/5.
// Function: connect to mongodb with mongoose

var mongoose = require('mongoose'),
    DB_url = 'mongodb://localhost/visualize';
mongoose.connect(DB_url);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + DB_url);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected.');
});

module.exports = mongoose;
