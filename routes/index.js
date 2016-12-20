var express = require('express');
var router = express.Router();
var jsonGenerate = require('./search');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/query/filter*', function (req, res) {
    var request = req.query;
    console.log(request);
    var query = jsonGenerate(request);
    var Business = require('../models/business');
    Business.find().and([
        query["jsonRes"],
        query["jsonHour"],
        query["jsonPark"],
        query["jsonGoodFor"]
    ]).limit(50).exec(function (err, results) {
        if (err) throw err;
        if (results.length == 0) {
            console.log("no result");
        }
        else {
            console.log(results.length);
        }
        res.json(results);
    });
});

module.exports = router;
