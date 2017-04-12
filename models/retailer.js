var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	title : String,
	description : String,
	slug : String,
	imageURL : String,
	adMRP : Number,
	adPrice : Number,
	discountPer : Number,
	postTime : Number,
	uid : Number,
	city : String,
	views : Number,
	likes: Number,
	categories : String,
	active : Number,
	params : Array
});

var productModel = mongoose.model('sd_products', productSchema);

module.exports = productModel;