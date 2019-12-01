var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password:{
		type:String,
		required:true
	},
	fullname:{
		type:String,
	},
	avatar:{
		type:String,
	},
	gender:{
		type:Number,
		default:0
	},
	role:{
		type: Number,
		default:1,
	},
	categoryId:{
		type:Schema.Types.ObjectId,
		ref: 'Category',
		required:true,
		default:null
	},
	time:{
		type:Number,
		default:1
	},
	created_at: { 
		type: Date,
		default: Date.now
	}
},{collection:'admins'});

var Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;