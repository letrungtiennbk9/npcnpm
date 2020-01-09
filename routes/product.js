var express = require('express');
var router = express.Router();
var productController =require('../controllers/productController');
//thông tin sản phẩm
router.get('/', productController.productInfo);

router.post('/', productController.postAddProduct);
router.get('/add-product', productController.getAddProduct);

//lấy thông tin người bán
router.post('/seller-contact',productController.sellerContact);

module.exports = router;