var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/query/filter*', function (req, res) {
  state = req.query.state;
  city = req.query.city;
  time = req.query.time;
  res.sendFile("filter.json");
})

module.exports = router;
