var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var userController = require('../controllers/userController');
//trang đăng nhập
router.get('/',homeController.loginPage);

//thực hiện đăng nhập
router.post('/',userController.userLogin);

module.exports = router;
