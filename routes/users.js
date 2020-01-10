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

//xem san pham đã đăng
router.get('/san-pham',userController.listProducts);

//xóa sp
router.post('/delete-product',userController.deleteProduct);

router.post('/mark-sold',userController.markSold);

router.post('/unmark-sold',userController.unMarkSold);

//đánh giá người bán
router.post('/review',userController.reviewUser);

router.post('/view-contact',userController.viewContact);

//đánh giá sản phẩm
router.post('/danh-gia-san-pham',userController.reviewProduct);

router.get('/wishlist',userController.wishList);

router.post('/addProduct', userController.upload ,userController.addProduct);


module.exports = router;
