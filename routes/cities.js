var express = require('express');
var router = express.Router();

var citiesModel = require('../models/cities.js');

/* GET cities list. */
router.get('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	citiesModel.find({}, function(err, cities) {
	  if (err) throw err;

	  // object of all the users
	  res.send(cities);
	});
});


module.exports = router;