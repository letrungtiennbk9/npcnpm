var express = require('express');
const request = require('request');
const API_URL = 'http://localhost:3000/';
const POST_PRODUCT_URL = 'users/addProduct';


//thông tin sản phẩm
exports.productInfo = function (req, res, next) {
	res.render('product');
}

exports.getAddProduct = function (req, res, next) {
	res.render('post_product', {userId: req.user._id});
}

exports.postAddProduct = function (req, res, next) {
}

//thông tin người bản
exports.sellerContact = function (req, res, next) {

}