var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

//thông tin tài khoản
router.get('/', userController.userInfo);

//trang đổi mật khẩu
router.get('/doi-mat-khau',userController.changePasswordPage);

//thực hiện thay đổi mật khẩu
router.post('/doi-mat-khau',userController.validateUpdatePassword,userController.changePassword);

//trang sửa đổi thông tin tài khoản
router.get('/sua-thong-tin',userController.editUserInfoPage);

//thực hiện thay đổi thông tin tài khoản
router.post('/sua-thong-tin',userController.validateUpdateInfo,userController.editUserInfo);

//trang đăng sản phẩm
router.get('/dang-san-pham',userController.postProductPage);

//thực hiện đăng sản phẩm
router.post('/dang-san-pham',userController.postProduct);

//trang sửa sản phẩm
router.get('/sua-san-pham',userController.editProductPage);

//thực hiện sủa sản phẩm
router.post('/sua-san-pham',userController.editProduct);

//xem san pham đã đăng
router.get('/san-pham',userController.listProducts);

//đánh giá người bán
router.post('/danh-gia',userController.reviewUser);

//đánh giá sản phẩm
router.post('/danh-gia-san-pham',userController.reviewProduct);


module.exports = router;
