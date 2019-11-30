var express = require('express');
var router = express.Router();
var productController =require('../controllers/productController');
//thông tin sản phẩm
router.get('/', productController,productInfo);

//lấy thông tin người bán
router.post('/seller-contact',productController.sellerContact);

module.exports = router;