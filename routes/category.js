var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController');

router.get('/',categoryController.listProduct);

//thuc hien them vao wish list
router.get('/them-vao-wishlist',categoryController.addToWishlist);

module.exports = router;
