var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
	slug : String,
	params : String,
	path : String,
	level : Number,
});

var categoriesModel = mongoose.model('sd_product_categories', categoriesSchema);

module.exports = categoriesModel;