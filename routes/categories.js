var express = require('express');
var router = express.Router();

var categoriesModel = require('../models/categories.js');

router.get('/', function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    categoriesModel.find({}, function(err, categories){
    	if (err) throw err;

    	res.send(categories);
    })
});

/* GET cities list. */
// router.get('/addCategories', function(req, res, next) {
//   var categories = new categoriesModel({
//   	name : "Electronics",
//   	slug : "electronics",
//   	order : 1,
//   	subCats : [
//   		{
//   			name : "Mobiles",
//   			slug : "mobiles"
//   		},
//   		{
//   			name : "Mobile Accessories",
//   			slug : "mobile-accessories"
//   		},
//   		{
//   			name : "Smartwatch & Wearables",
//   			slug : "smartwatch-wearables"
//   		},
//   		{
//   			name : "Laptops",
//   			slug : "laptops"
//   		},
//   		{
//   			name : "Tablets",
//   			slug : "tablets"
//   		},
//   		{
//   			name : "Computer Accessories",
//   			slug : "computer-accessories"
//   		},
//   		{
//   			name : "Cameras & Accessories",
//   			slug : "cameras-accessories"
//   		},
//   		{
//   			name : "Personal Care Appliances",
//   			slug : "personal-care-appliances"
//   		},
//   		{
//   			name : "Gaming",
//   			slug : "gaming"
//   		}, 
//   		{
//   			name : "Audio & Video",
//   			slug : "audio-video"
//   		}
//   	]
//   });

//   categories.save(function(err, response){
//   	if(err) throw err;

//   	res.json({
//   		success : true
//   	})
//   })
// });



module.exports = router;