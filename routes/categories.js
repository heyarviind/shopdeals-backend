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

router.get('/getparms/:cat', function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    categoriesModel.aggregate([
    {
        "$match": {
            "subCats.subCats.slug": req.params.cat
        }
    },
    { "$unwind": "$subCats" },
    { "$unwind": "$subCats.subCats" },
    {
        "$match": {
            "subCats.subCats.slug": req.params.cat
        }
    },
    {
        "$project": {
            "data":"$subCats.subCats"
        }
    }
],function(err, categories){
    	if (err) throw err;

    	res.send(categories);
    })
});


router.get('/:subcact', function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

   //var query = "/"+ req.params.subcact + "/i";

    categoriesModel.find({"path": "/electronics/"}, function(err, categories){
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
//   			slug : "mobiles",
//   			subCats : [
// 	  			{
// 	  				name : "Apple",
// 	  				slug : "apple",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "HTC",
// 	  				slug : "htc",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "Mi",
// 	  				slug : "mi",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "OPPO",
// 	  				slug : "oppo",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "Samsung",
// 	  				slug : "samsung",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "Lenovo",
// 	  				slug : "lenovo",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "Motorola",
// 	  				slug : "motorola",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "LG",
// 	  				slug : "lg",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "Huawei",
// 	  				slug : "huawei",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "Nokia",
// 	  				slug : "nokia",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			},
// 	  			{
// 	  				name : "Microsoft",
// 	  				slug : "microsoft",
// 	  				params : ["RAM","Storage","Primary Camera","Front Camera","Battery","Processor","Display Size","Resolution","Resolution Type","GPU","Operating System"]
// 	  			}
//   			]
//   		},
//   		{
//   			name : "Mobile Accessories",
//   			slug : "mobile-accessories",
//   			subCats : [
//   				{
//   					name : "Mobile Cases",
//   					slug : "mobile-cases",
//   					params : ["Model","type"]
//   				},
//   				{
//   					name : "Headphones & Headsets",
//   					slug : "headphones-headsets",
//   					subCats : [
//   						{
//   							name : "Sony",
//   							slug : "sony",
//   							params : ["Color","Model Name","Type"]
//   						},
//   						{
//   							name : "Bose",
//   							slug : "bose",
//   							params : ["Color","Model Name","Type"]
//   						},
//   						{
//   							name : "JBL",
//   							slug : "jbl",
//   							params : ["Color","Model Name","Type"]
//   						},
//   						{
//   							name : "Sennhesier",
//   							slug : "sennhesier",
//   							params : ["Color","Model Name","Type"]
//   						},
//   						{
//   							name : "Philips",
//   							slug : "philips",
//   							params : ["Color","Model Name","Type"]
//   						},
//   						{
//   							name : "Skullcandy",
//   							slug : "skullcandy",
//   							params : ["Color","Model Name","Type"]
//   						},
//   						{
//   							name : "Audio Technica",
//   							slug : "audio-technica",
//   							params : ["Color","Model Name","Type"]
//   						},
//   					]
//   				}
//   			]
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