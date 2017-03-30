var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
	name : String,
	slug : String,
	order : Number,
	subCats : [{
		name : String,
		slug : String
	}]
});

var categoriesModel = mongoose.model('sd_categories', categoriesSchema);

module.exports = categoriesModel;