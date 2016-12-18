var express = require('express');
var router = express.Router();
var jsonGenerate = require('./search');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/query/filter*', function (req, res) {
    var request = req.query;
    var query = jsonGenerate(request);
    var Business = require('../models/business');
    Business.find(query, function (err, results) {
        console.log(results[0]);
        res.sendFile(results);
    });
});

module.exports = router;
