var mongoose = require('mongoose');

var adSchema = new mongoose.Schema({
	title : String,
	description : String,
	slug : String,
	imageURL : String,
	adMRP : Number,
	adPrice : Number,
	discountPer : Number,
	postTime : Number,
	uid : Number,
	views : Number,
	likes: Number,
	categories : String
});

var adModel = mongoose.model('sd_ads', adSchema);

module.exports = adModel;