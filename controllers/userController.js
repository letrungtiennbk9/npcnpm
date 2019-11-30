var express = require('express');

//thực hiện đăng ký
exports.userRegister = function(req,res,next){

}

//thực hiện đăng nhập
exports.userLogin = function(req,res,next){
	
}

//thông tin tài khoản
exports.userInfo = function(req, res, next) {
  res.render('index');
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
	//
}

//trang sửa đổi thông tin tài khoản
exports.editUserInfoPage = function(req,res,next){
	res.render('edit_user_info');
}

//thực hiện thay đổi thông tin tài khoản
exports.editUserInfo = function(req,res,next){
	//
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
