var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
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
	contact:{
		phone:{
			type:String,
			required:true,
		},
		email:{
			type:String,
		},
		facebook:{
			type:String,
		},
		address:{
			type:String,
		}
	},
	gender:{
		type:Number,
		default:0
	},
	views:{
		type:Number,
		required:true,
		default:0
	},
	rating:{
		type:Number,
		default:0,
	},
	blocked_at:{
		type:Date,
		default:null
	},
	created_at: { 
		type: Date,
		default: Date.now
	}
},{collection:'users'});

var User = mongoose.model('User', userSchema);

module.exports = User;