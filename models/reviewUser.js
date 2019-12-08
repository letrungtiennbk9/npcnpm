var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewUserSchema = mongoose.Schema({
	reviewedUserId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'User'
	},
	reviewedByUserId:{
		type:Schema.Types.ObjectId,
		required:true,
		ref:'User'
	}
	point: {
		type: Number,
		required: true
	},
	review:{
		type:String,
		required:true,
		default:null
	},
	created_at: { 
		type: Date,
		default: Date.now
	}
},{collection:'review_user'});

var reviewUser = mongoose.model('reviewUser', reviewUserSchema);

module.exports = reviewUser;