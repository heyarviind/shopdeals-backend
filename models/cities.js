var mongoose = require('mongoose');

var citiesSchema = new mongoose.Schema({
	name : String,
	active : Boolean
});

var citiesModel = mongoose.model('sd_cities', citiesSchema);

module.exports = citiesModel;