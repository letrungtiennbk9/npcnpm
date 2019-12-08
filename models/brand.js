var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var brandSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	categoryId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref: 'Category'
	},
	deleted_at:{
		type:Date,
		default:null
	},
	created_at: { 
		type: Date,
		default: Date.now
	}
},{collection:'brands'});

var Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;