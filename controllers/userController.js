var express = require('express');
let User = require('../models/user');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.validateCreateAccount = [
check('username', 'Tên tài khoản không được để trống').notEmpty(),
check('password', 'Mật khẩu tối thiểu 5 ký tự').isLength({ min: 5 }),
check('password2', 'Mật khẩu xác nhận không chính xác').custom((value, { req }) => value === req.body.password),
check('phone', 'Số điện thoại không hợp lệ').isMobilePhone('vi-VN'),
check('email', 'Email không hợp lệ').isEmail(),
check('fullname', 'Họ tên không hợp lệ').optional().isString(),
check('facebook').optional().isString(),
check('address').optional().isString(),
check('gender').optional().isNumeric(),
check('avatar').optional().isString()
];

exports.validateUpdateInfo = [
check('phone', 'Số điện thoại không hợp lệ').isMobilePhone('vi-VN'),
check('email', 'Email không hợp lệ').isEmail(),
check('fullname', 'Họ tên không hợp lệ').optional().isString(),
check('facebook').optional().isString(),
check('address').optional().isString(),
check('gender').optional().isNumeric({min:0,max:1}),
check('avatar').optional().isString()
];

exports.validateUpdatePassword = [
check('password', 'Mật khẩu tối thiểu 5 ký tự').isLength({ min: 5 }),
check('password2', 'Mật khẩu xác nhận không chính xác').custom((value, { req }) => value === req.body.password),
];

//thực hiện đăng ký
exports.userRegister = function(req,res,next){
	
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).send(errors);
	}

	let newUser = new User({
		username: req.body.username,
		password: req.body.password,
		fullname: req.body.fullname,
		avatar: req.body.avatar,
		phone: req.body.phone,
		email: req.body.email,
		facebook: req.body.facebook,
		address: req.body.address,
		gender: req.body.gender
	});

	User.createUser(newUser, function (err, createdUser) {
		if (err) {
			res.status(503);
			res.send(err);
			return;
		}
		else {
			req.login(newUser,function(err){
				if (err) {
					return res.status(503).send(err);
				}
				else{
					return res.status(200).send('OK');
				}
			})
		}
	})
}

//thực hiện đăng nhập
exports.userLogin = function(req,res,next){
	passport.authenticate('local', function(error, user, info) {
		if(error) {
			return res.status(500).json(error);
		}
		if(!user) {
			return res.status(401).json(info);
		}
		req.login(user, function(err) {
			if (err) {
				res.status(500).json(error);
			} else {
				res.status(200).json({success:true});
			}
		});
	})(req, res, next);
}

//thông tin tài khoản
exports.userInfo = function(req, res, next) {
	res.render('user_info');
};

//quên mật khẩu
exports.forgotPassword = function(req,res,next){
	res.render('forgot_password');
};

//trang đổi mật khẩu
exports.changePasswordPage = function(req,res,next){
	res.render('change_password');
}

//thực hiện thay đổi mật khẩu
exports.changePassword = function(req,res,next){
	let errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(422).send(errors);
	}
	let user = req.user;
	User.comparePassword(req.body.cur_password, user.password, (err, isMatch) => {
		if (err) throw err;
		if (!isMatch) {
			return res.status(422).send({errors:[{msg:'Mật khẩu hiện tại không chính xác',param:'cur_password'}]});
		}
		else{
			user.password =req.body.password;
			User.updatePassword(user,function(err){
				if(err){
					return res.status(503).send(err);
				}
				else{
					return res.status(200).json({message:'Ok'});
				}
			});
		}
	});
}

//trang sửa đổi thông tin tài khoản
exports.editUserInfoPage = function(req,res,next){
	res.render('edit_user_info');
}

//thực hiện thay đổi thông tin tài khoản
exports.editUserInfo = function(req,res,next){

	let errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(422).send(errors);
	}
	else{
		let user = req.user;
		user.fullname =req.body.fullname;
		user.email = req.body.email;
		user.phone = req.body.phone;
		user.facebook = req.body.facebook;
		user.address = req.body.address;
		user.gender = req.body.gender;

		User.updateInfo(user,function(err){
			if(err){
				return res.status(503).send(err);
			}
			else{
				return res.status(200).json({message:'Ok'});
			}
		});
	}
}

//đăng sản phẩm
exports.postProductPage = function(req,res,next){
	res.render('post_product');
};

//thực hiện đăng sản phẩm
exports.postProduct = function(req,res,next){
	//
}

//trang sửa sản phẩm
exports.editProductPage = function(req,res,next){
	//
}

//thực hiện sủa sản phẩm
exports.editProduct = function(req,res,next){
	//
}


//xem san pham đã đăng
exports.listProducts = function(req,res,next){
	res.render('list_posted_product');
};

//lịch sử mua hàng
exports.history = function(req,res,next){
	res.render('history');
};

//đánh giá người bán
exports.reviewUser = function(req,res,next){

};

//đánh giá sản phẩm
exports.reviewProduct = function(req,res,next){

};


passport.use(new LocalStrategy(function (username, password, done) {
	User.getUserByUsername(username, (err, foundUser) => {
		if (err) {
			throw err;
		}
		if (!foundUser) {
			return done(null, false, { message: 'Unknown user' });
		}

		User.comparePassword(password, foundUser.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				return done(null, foundUser);
			}
			else {
				return done(null, false, { message: 'Invalid password' });
			}
		});
	});
}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

exports.logoutUser = (req, res) => {
	req.logOut();
	return res.redirect('/');
}
