var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/ads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('image');


var adModel = require('../models/retailer.js');

router.get('/ads', function (req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    adModel.find({}, function(err, response){
    	if(err) throw err;

    	res.send(response);
    });
});

router.post('/ads/uploadImage', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end(res);
    });

})

module.exports = router;