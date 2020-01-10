var express = require('express');
let User = require('../models/user');
let UserReview = require('../models/reviewUser');
const Product = require('../models/product');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let multer = require('multer');
const API_URL = 'http://localhost:3000/';
const STORE_PATH = './public/images/';
let mongoose = require('mongoose');

const BROWSE_PATH = API_URL + 'images/'

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
	User.findOne({username:req.body.username},function(err,user){
		if(err){
			return res.status(503).send(err);
		}
		else if(user){
			return res.status(422).send({errors:[{msg:'Tên tài khoản đã tồn tại',param:'username'}]});
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
				return res.status(503).send(err);
			}
			else {
				req.login(newUser,function(err){
					if (err) {
						return res.status(503).send(err);
					}
					else{
						return res.status(200).send({message:'OK'});
					}
				})
			}
		})
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
	let id = req.user._id;
	User.findById(id).populate({path:'reviews',options:{populate:{path:'reviewedByUserId'},sort:{created_at:-1}}}).exec(function(err,userReviews){
		if(err){
			return res.status(503).send(err);
		}
		else return res.render('user_info',{userReviews:userReviews});
	})
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
	let id = req.user._id;
	Product.find({userId:id,deleted_at:null},function(err,products){
		if(err){
			return res.status(503).send({message:'server error'});
		}else{
			console.log(products);
			return res.render('list_posted_product',{products:products});
		}	
	})
};
// ,options:{populate:{path:'wishlist'}}
exports.wishList =function(req,res,next){
	let id = req.user._id;
	User.findById(id).populate({path:'wishlist.productid'}).exec(function(err,user){
		if(err){
			console.log(err); 

			return res.status(503).send(err);
		}
		else{
			let products=[]
			console.log(user.wishlist.length+"1111");
			for(product in user.wishlist){
				if(user.wishlist[product]!=null)
				products.push(user.wishlist[product].productid)
			}

			console.log(products);
			
			return res.render('wish_list',{products:products});
	}
	})

}

//lịch sử mua hàng
exports.history = function(req,res,next){
	res.render('history');
};

//đánh giá người bán
exports.reviewUser = function(req,res,next){
	let point = parseInt(req.body.point);
	let review = req.body.review;
	if(!review||review.length>=500){
		return res.status(422).send({errors:[{msg:'Nội dung đánh giá không được để trống và không quá 500 ký tự',param:'review'}]});
	}
	if(point<1){
		point=1;
	}
	else if(point>5){
		point=5;
	}
	let fromUser = req.user._id;
	let toUser = req.body.to_user;
	if(fromUser==toUser){
		return res.status(503).send({message:'error'});
	}
	let reviewObj ={point:point,review:review,reviewedUserId:toUser,reviewedByUserId:fromUser};
	UserReview.findOne({reviewedUserId:toUser,reviewedByUserId:fromUser},function(err,doc){
		if(err){
			return res.status(503).send(err);
		}
		else if(doc!=null){
			doc.review=review;
			doc.point=point;
			doc.created_at = Date.now();
			doc.save(function(err,result){
				if(err){
					return res.status(503).send(err);
				}
				else{
					return res.status(200).send({review:result});
				}
			});

		}
		else{
			UserReview.create(reviewObj,function(err){
				if(err){
					return res.status(503).send(err);
				}
				else{
					return res.status(200).send({review:reviewObj});
				}
			})
		}
	})

};
exports.deleteProduct = function(req,res,next){
	let id = req.body.id;
	Product.findOneAndUpdate({_id:id,userId:req.user._id},{deleted_at:Date.now()},function(err){
		if(err){
			return res.status(503).send(err);
		}
		else{
			return res.status(200).send({message:'ok'});
		}
	})
}
exports.markSold = function(req,res,next){
	let id = req.body.id;
	Product.findOneAndUpdate({_id:id,userId:req.user._id},{sold:Date.now()},function(err){
		if(err){
			return res.status(503).send(err);
		}
		else{
			return res.status(200).send({message:'ok'});
		}
	})
}

exports.unMarkSold = function(req,res,next){
	let id = req.body.id;
	Product.findOneAndUpdate({_id:id,userId:req.user._id},{sold:null},function(err){
		if(err){
			return res.status(503).send(err);
		}
		else{
			return res.status(200).send({message:'ok'});
		}
	})
}

exports.viewContact = function(req,res,next){
	let id = req.body.id;
	User.findById(id,function(err,user){
		if(err||!user){
			return res.status(503).send(err);
		}
		else{
			let data = {email:user.email,facebook:user.facebook,phone:user.phone,address:user.address};
			return res.status(200).send(data);
		}
	})
}

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
	console.log('yfytdytdytdytdyt');
	return res.redirect('/');
}
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, STORE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

let fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/jpg') {
    cb(null, true);
  }
  else {
    cb(new Error('Định dạng file không hợp lệ'), false);
  }
}

exports.upload = multer({ storage: storage, fileFilter: fileFilter }).single('productImage');

exports.addProduct = (req, res, next) => {
	console.log(req.file.filename);
	console.log(req.body);
  req.body.images = 'http://localhost:3000/images/' + req.file.filename;

  let tmp = new Product({
    name: req.body.name,
    categoryId: req.body.categoryId,
    userId: mongoose.Types.ObjectId(req.body.userId),
    images: req.body.images,
    price: req.body.price,
    detail: req.body.detail,
    location: req.body.location,
    status: req.body.status
  })

  tmp.save((err, doc) => {
    console.log(err);
    if(err) {
    	console.log(err);
    	return res.status(500).json({message: err});
    }
    else {
      return res.status(200).json({result: doc});
    }
  });
}
