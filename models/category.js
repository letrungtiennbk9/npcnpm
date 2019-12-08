var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	deleted_at:{
		type:Date,
		default:null
	},
	created_at: { 
		type: Date,
		default: Date.now
	}
},{collection:'categories'});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;