var express = require('express');
var router = express.Router();
var productController =require('../controllers/productController');
//thông tin sản phẩm

router.post('/add-product', productController.postAddProduct);
router.get('/add-product', productController.getAddProduct);

//lấy thông tin người bán
router.post('/seller-contact',productController.sellerContact);
router.get('/:id', productController.productInfo);

router.get('/:nTurn/:sortType', productController.getOnDemand);

module.exports = router;