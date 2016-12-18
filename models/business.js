// Created by xuziru on 2016/12/6.
// Function: business information format initial

var mongoose = require('./mongodb'),
    Schema = mongoose.Schema;

var BusinessSchema = new Schema({
    type: String,
    business_id: String,
    name: String,
    neighborhoods: [String],
    full_address: String,
    city: String,
    state: String,
    latitude: Number,
    longitude: Number,
    stars: Number,
    review_count: Number,
    categories: [String],
    open: Boolean,
    hours: {},
    attributes: {},
    review: {
        service: Number,
        food: Number,
        environment: Number,
        price: Number
    }
});

module.exports = mongoose.model('Business', BusinessSchema);