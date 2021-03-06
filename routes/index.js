var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var userController = require('../controllers/userController');

const redirectIfLogged = function(req,res,next){
	if(req.isAuthenticated()){
		console.log('1');
		res.redirect('/');
	}
	else{
		console.log('2');
		next();
	}
}

router.get('/',homeController.homePage);

//trang đăng ký-đăng nhập
router.get('/login',redirectIfLogged,homeController.loginPage);

//đăng xuất
router.get('/logout',userController.logoutUser);

//thực hiện đăng nhập
router.post('/login',userController.userLogin);

//thực hiện đăng ký
router.post('/register',userController.validateCreateAccount,userController.userRegister);

//trang quên mật khẩu
router.get('/quen-mat-khau',redirectIfLogged,userController.forgotPassword);

//xem thong tin tài khoản khác
router.get('/info',homeController.viewUserInfo);

//xem danh sách sản phẩm của tài khoản khác
router.get('/info/posts',homeController.viewUserPost);

module.exports = router;
