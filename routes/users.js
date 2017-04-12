var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('../models/config');
var bcrypt = require('bcrypt');

var usersModel = require('../models/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	usersModel.find({}, function(err, users) {
	    res.json(users);
	  });

});

//login user
router.post('/auth', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	
	usersModel.findOne({
		email : req.body.email
	}, function(err, user){

		if(err) throw err;

		if(!user){
			res.json({
				success : false,
				message : 'User not found!'
			});
		} else if(user){ 

			bcrypt.compare(req.body.password, user.password, function(err, response){
				if(err) throw err;

				if(response){
					var token = jwt.sign({objectID : user._id}, config.secretCode,{
						expiresIn : 60*60*24
					});

					res.json({
			          success: true,
			          message: 'Enjoy your token!',
			          token: token
			        });
				} else {
					res.json({
						success : false,
						message: 'not matched!'
					})
				}

				

			});
		}
	});
	});

router.get('/signup/step-one',function(req, res, next){
	//just for testing
	res.json({
		message : "i am here!"
	})
});
// Siging up a user
// Step one will store email, passowrd and name
// email and password will be stored in different collection so that 
// token length will be short
router.post('/signup/step-one',function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // check if email already exists in database
    // if do, stop the signup process 
    // else add the information to the database

    usersModel.findOne({
		email : req.body.email
	}, function(err, user){
		if(err) throw err;

		user = user || '';

		if(user.length){
			res.json({
				success : false,
				message : "Email already exists in database!"
			});

		} else {

			function hashPassword(password){
				
			}
			// Create the user schema
			var data = new usersModel({
				email : req.body.email,
				password : bcrypt.hashSync(req.body.password, config.saltRounds),
				name : req.body.name,
				isRetailer : req.body.isRetailer
			});

			// Insert the data in the database
			data.save( function(err, response){
				if(err) throw err;

				var token = jwt.sign({objectID : response._id}, config.secretCode,{
					expiresIn : 60*60*24
				});
				var objectID = response._id;

				res.json({
					success : true,
					message : "User registered!",
					token : token
				});

			});
		}
	});

});

//Signup method for step 2

router.post('/signup/step-two',function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // check if email already exists in database
    // if do, stop the signup process 
    // else add the information to the database
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
    	jwt.verify(token, config.secretCode, function(err, decoded){
    		if(err) {
    			res.json({
    				message : "Wrong token provided!"
    			})
    		} else {
    			
    			var userData = new usersModel({
					_id : decoded.objectID,
    				shopName : req.body.shopName,
    				shopAddress : req.body.shopAddress,
    				latitude : req.body.latitude,
    				longitude : req.body.longitude,
    				city : req.body.city
    			});

    			console.log(userData);
  
    			usersModel.findOneAndUpdate({"_id" : decoded.objectID},userData,{upsert:true}, function(err, response){
    				if (err) throw err;

    				res.json({
    					success : true
    				})
    			});
    		}
    	});
    } else {
    	res.json({
    		message : "Please provide a token"
    	})
    }


});


//Signup method for step 2

router.post('/signup/step-three',function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // check if email already exists in database
    // if do, stop the signup process 
    // else add the information to the database
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
    	jwt.verify(token, config.secretCode, function(err, decoded){
    		if(err) {
    			res.json({
    				message : "Wrong token provided!"
    			})
    		} else {
    			console.log(req.body.categories);
    			var userData = new usersModel({
					_id : decoded.objectID,
    				categories : req.body.categories
    			});
  
    			usersModel.findOneAndUpdate({"_id" : decoded.objectID},userData,{upsert:true}, function(err, response){
    				if (err) throw err;

    				res.json({
    					success : true
    				})
    			});
    		}
    	});
    } else {
    	res.json({
    		message : "Please provide a token"
    	})
    }


});

/*
	Getting user details
	everything about user
*/
router.post('/getUserDetails', function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
    	jwt.verify(token, config.secretCode, function(err, decoded){
    		if(err) {
    			res.json({
    				message : "Wrong token provided!"
    			})
    		} else {

    			usersModel.findOne({"_id" : decoded.objectID}, function(err, response){
    				res.send(response);
    			});

    		}
    	});
    }

});

module.exports = router;
