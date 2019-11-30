var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var userController = require('../controllers/userController');
//trang đăng ký
router.get('/',homeController.registerPage);

//thực hiện đăng ký
router.post('/',userController.userRegister);

module.exports = router;
