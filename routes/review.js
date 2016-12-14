// Created by xuziru on 2016/12/14.
// Function: add real review score to business database

var express = require('express');
var router = express.Router();
var fs = require('fs');
var readline = require('readline');

router.get('/', function(req, res, next) {
    var filename = 'data/review.json';
    var Business = require('../models/business');
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
        Business.find({}, function () {
            // modify result

            // result.update
            // Business.update({_id: subtable._id}, {
            //     $set: {
            //         categories: categories,
            //         attributes: attributes
            //     }
            // }, function (err) {
            //     if (err) throw err;
            //     console.log('update success')
            // });
        });
        counter++;
        if (counter % 5000 == 0) {
            printSpeedInfo(counter, startTime);
        }
    });

    res.send('review info add to business database');
});

module.exports = router;