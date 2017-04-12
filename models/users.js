var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
	categories : Array,
	city : String,
	email : String,
	password : String,
	isRetailer : Boolean,
	latitude : Number,
	longitude : Number,
	name : String,
	shopAddress : String,
	shopName : String
});

var userModel = mongoose.model('sd_users', usersSchema);

module.exports = userModel;