// Created by xuziru on 2016/12/20.
// Function: get city and state relation of business database

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var Business = require('../models/business');
    var City = require('../models/city');
    var objInList = require('./objInList');
    var printSpeedInfo = require('./tools');

    var business, state, city, cityList = [];
    var jsonRes = {};
    var startTime = Date.now();

    Business.find({}, function (err, results) {
        if (err) throw err;
        business = results;

        for (var i = 0, l = business.length; i < l; i++) {
            state = business[i].state;
            city = business[i].city;

            if (state in jsonRes) {
                if (!objInList(city, jsonRes[state])) {
                    cityList = jsonRes[state];
                    cityList.push(city);
                    jsonRes[state] = cityList;
                }
            }
            else {
                cityList = [];
                cityList.push(city);
                jsonRes[state] = cityList;
            }

            if (i % 5000 == 0) {
                printSpeedInfo(i, startTime);
            }
        }

        console.log("load city finish");

        var index = 0;
        for (var key in jsonRes) {
            var obj = new City({
                state: key,
                city: jsonRes[key]
            });
            obj.save(function (err) {
                if (err) throw err;
                // console.log('One business info saved.');
                index += 1;
                if (index % 1000 == 0) {
                    printSpeedInfo(index, startTime);
                }
            });
        }

        console.log("state city relation get");
    });

    res.send('city state relation');
});

module.exports = router;