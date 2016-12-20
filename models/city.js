// Created by xuziru on 2016/12/20.
// Function: table for relation of states and cities

var mongoose = require('./mongodb'),
    Schema = mongoose.Schema;

var CitySchema = new Schema({
    state: String,
    city: [String]
});

module.exports = mongoose.model('City', CitySchema);