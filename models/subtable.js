// Created by xuziru on 2016/12/12.
// Function: format for categories and hours

var mongoose = require('./mongodb'),
    Schema = mongoose.Schema;

var subTableSchema = new Schema({
    categories: [String],
    hours: [String],
    attributes: {}
});

module.exports = mongoose.model('SubTable', subTableSchema);