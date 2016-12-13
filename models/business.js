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
    attributes: {}
});

module.exports = mongoose.model('Business', BusinessSchema);

// var Business = mongoose.model('Business', BusinessSchema);
//
// var businessInfo = function() {};
//
// businessInfo.prototype.save = function(obj, callback) {
//     var instance = new Business(obj);
//     instance.save(function(err) {
//         callback(err);
//     });
// };
//
// businessInfo.prototype.findByName = function(name, callback) {
//     Business.findOne({name: name}, function(err, obj) {
//        callback(err, obj);
//     });
// };
//
// module.exports = new businessInfo();
