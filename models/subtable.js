// Created by xuziru on 2016/12/12.
// Function: format for categories and hours

var mongoose = require('./mongodb'),
    Schema = mongoose.Schema;

var subTableSchema = new Schema({
    state: [String],
    city: [String],
    stars: Number,
    review: {
        service: Number,
        food: Number,
        environment: Number,
        price: Number
    },
    categories: [String],
    hours: [String],
    attributes: {}
});

module.exports = mongoose.model('SubTable', subTableSchema);