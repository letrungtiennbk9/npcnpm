var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

module.exports.createUser = function (newUser, callBack) {
	var bcrypt = require('bcryptjs');
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callBack);
		});
	});
}

module.exports.getUserByUsername = (username, callback) => {
	User.findOne({ username: username }, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
}

module.exports.updateInfo = function (user, callback) {
	user.save(callback);
}

module.exports.updatePassword = function (newUser, callback) {
	var bcrypt = require('bcryptjs');
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}