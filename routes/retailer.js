var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../models/config');
var bcrypt = require('bcrypt');
var multer = require('multer'),
  bodyParser = require('body-parser'),
  path = require('path');
var crypto = require('crypto');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/ads')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    });
  }
})

var productModel = require('../models/retailer.js');
var categoriesModel = require('../models/categories.js');
var usersModel = require('../models/users.js');

router.get('/ads', function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    adModel.find({}, function(err, response){
    	if(err) throw err;

    	res.send(response);
    });
});

router.post('/postProduct', multer({ storage: storage }).single('image'), function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  //console.log(req.body);
  //console.log(req.file);

  var cat  = req.body.cat;
  var params = '';

  categoriesModel.find({ slug:cat },"",function(err, categories){
    if(err) throw err;

    params = categories[0].params;

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
      jwt.verify(token, config.secretCode, function(err, decoded){
        console.log(err);
        if(err) {
          res.json({
            message : "Wrong token provided!"
          })
        } else {
          var uid = decoded.objectID;

          //if image uploaded 
          if(typeof req.file.image !== "undefined"){
            filename = req.file.filename;
          } else{
            filename = '';
          }
         
          //Calculating Doscount
          if(req.body.adPrice != '' && req.body.adMarketPrice != ''){
            var price = req.body.adPrice;
            var mrp = req.body.adMarketPrice;

            discountPer = ((mrp - price) / mrp) * 100;
          } else {
            discountPer = 0;
          }

          //Get retailer city
          usersModel.findOne({_id:uid},function(err, res){
            var city = res.city;

            var productData = new productModel({
              title : req.body.adTitle,
              description : req.body.adDescription,
              slug : req.body.adTitle.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'),
              imageURL : req.file.filename,
              adMRP : req.body.adMarketPrice,
              adPrice : req.body.adPrice,
              discountPer : discountPer,
              postTime : new Date(),
              uid : uid,
              city : city,
              views : 0,
              likes: 0,
              categories : cat,
              active : 0,
              params : params
            });
          });

          console.log(productData);
        }
      });
    } else {
      console.log('No token provided!');
    }

  });

  
});

module.exports = router;