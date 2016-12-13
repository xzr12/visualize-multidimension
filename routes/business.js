// Created by xuziru on 2016/12/6.
// Function: interface to operate on business database

var express = require('express');
var router = express.Router();
var fs = require('fs');
var readline = require('readline');

router.get('/', function(req, res, next) {
    var filename = 'data/yelp_academic_dataset_business.json';
    var Business = require('../models/business');
    var SubTable = require('../models/subtable');
    var printSpeedInfo = require('./tools');

    var counter = 0, startTime = Date.now();

    var rl = readline.createInterface ({
        input: fs.createReadStream (filename, {
            encoding: 'utf-8'
        }),
        output: null
    });

    rl.on('line', function (line) {
        jsonLine = JSON.parse(line);
        for (var i = 0, l = jsonLine.categories.length; i < l; i++) {
            if (jsonLine.categories[i] == 'Restaurants') {
                var obj = new Business(jsonLine);
                obj.save(function (err) {
                    if (err) throw err;
                    // console.log('One business info saved.');
                });
            }
        }
        counter++;
        if (counter % 5000 == 0) {
            printSpeedInfo(counter, startTime);
        }
    });

    var categories = [];
    var hours = ['Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Satursday', 'Sunday'];
    var attributes = {'a':'a'};
    var subJson = {
        categories: categories,
        hours: hours,
        attributes: attributes
    };
    var subTable = new SubTable(subJson);
    subTable.save(function (err) {
        if (err) throw err;
        console.log('subtable save success');
    });

    res.send('business');
});

module.exports = router;