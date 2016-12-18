// Created by xuziru on 2016/12/12.
// Function: get attributes of business database

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var Business = require('../models/business');
    var SubTable = require('../models/subtable');
    var printSpeedInfo = require('./tools');

    var counter, startTime = Date.now();
    var business, categories = [], attributes = {};
    var subtable;

    Business.find({}, function (err, results) {
        if (err) throw err;
        business = results;

        console.log('categories processing begin');

        var jsonList = [];
        for (var i = 0, l = business.length; i < l; i++) {
            for (var j = 0, k = business[i].categories.length; j < k; j++) {
                var cateObj = business[i].categories[j];
                if (!objInList(cateObj, categories) && cateObj != 'Restaurants') {
                    categories.push(cateObj);
                }
            }
            jsonList.push({
                parent: [],
                content: business[i].attributes
            });
            if (i % 5000 == 0) {
                printSpeedInfo(i, startTime);
            }
        }

        console.log('attributes processing begin');
        counter = 0;

        while (jsonList.length > 0) {
            jsonObj = jsonList[0].content;
            jsonParent = jsonList[0].parent;
            if ((typeof jsonObj) == 'object') {
                for (var k in jsonObj) {
                    jsonList.push({
                        parent:jsonParent.concat(k),
                        content:jsonObj[k]
                    })
                }
            }
            else {
                var key;
                if (jsonParent.length == 1) {
                    key = jsonParent[0];
                    var temp;
                    if (key in attributes) {
                        if (!objInList(jsonObj, attributes[key])) {
                            temp = attributes[key];
                            temp.push(jsonObj);
                            attributes[key] = temp;
                        }
                    }
                    else {
                        temp = [];
                        temp.push(jsonObj);
                        attributes[key] = temp;
                    }
                }
                else {
                    var par = jsonParent;
                    var attr = attributes;
                    while (par.length > 1) {
                        key = par[0];
                        if (!(key in attr)) {
                            attr[key] = {};
                        }
                        attr = attr[key];
                        par.shift();
                    }
                    key = par[0];
                    if (key in attr) {
                        if (!objInList(jsonObj, attr[key])) {
                            temp = attr[key];
                            temp.push(jsonObj);
                            attr[key] = temp;
                        }
                    }
                    else {
                        temp = [];
                        temp.push(jsonObj);
                        attr[key] = temp;
                    }
                }
            }
            jsonList.shift();
            counter++;
            if (counter % 5000 == 0) {
                printSpeedInfo(counter, startTime);
            }
        }

        console.log('subtable save begin');

        SubTable.find({}, function (err, results) {
            if (err) throw err;

            subtable = results[0];
            SubTable.update({_id: subtable._id}, {
                $set: {
                    categories: categories,
                    attributes: attributes
                }
            }, function (err) {
                if (err) throw err;
                console.log('update success')
            });
        });
    });

    res.send('subtable info update');
});

function objInList (obj, l) {
    for (var i = 0, le = l.length; i < le; i++) {
        if(obj == l[i]) {
            return true;
        }
    }
    return false;
}

module.exports = router;