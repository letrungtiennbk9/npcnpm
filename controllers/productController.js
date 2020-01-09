var express = require('express');
const request = require('request');
const API_URL = 'http://localhost:3000/';
const POST_PRODUCT_URL = 'users/addProduct';
const Product = require('../models/product');


//thông tin sản phẩm
exports.productInfo = function (req, res, next) {
	Product.findById(req.params.id, (err, doc) => {
		if(doc.categoryId == 1){
			doc.categoryInString = 'Bất động sản';
		}
		if(doc.categoryId == 2){
			doc.categoryInString = 'Xe cộ';
		}
		if(doc.categoryId == 3){
			doc.categoryInString = 'Thời trang';
		}
		if(doc.categoryId == 4){
			doc.categoryInString = 'Đồ điện tử';
		}
		if(doc.categoryId == 5){
			doc.categoryInString = 'Giải trí';
		}

		if(doc.location == 1){
			doc.locationInString = 'Tp. Hồ Chí Minh';
		}
		if(doc.location == 2){
			doc.locationInString = 'Hà Nội';
		}
		if(doc.location == 3){
			doc.locationInString = 'Đà Nẵng';
		}
		if(doc.location == 4){
			doc.locationInString = 'Cần Thơ';
		}
		if(doc.location == 5){
			doc.locationInString = 'Huế';
		}

		if(doc.status == 1){
			doc.statusInString = 'Mới 100%';
		}
		if(doc.status == 2){
			doc.statusInString = 'Như mới';
		}
		if(doc.status == 3){
			doc.statusInString = 'Mới vừa';
		}
		if(doc.status == 4){
			doc.statusInString = 'Khá mới';
		}
		if(doc.status == 5){
			doc.statusInString = 'Khá cũ';
		}
		
		res.render('product', {theProduct: doc});
	});
}

exports.getAddProduct = function (req, res, next) {
	res.render('post_product', {userId: req.user._id});
}

exports.postAddProduct = function (req, res, next) {
}

//thông tin người bản
exports.sellerContact = function (req, res, next) {

}