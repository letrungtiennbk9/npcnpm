var express = require('express');

//thông tin sản phẩm
exports.productInfo=function(req,res,next){
	res.render('product');
}

exports.getAddProduct=function(req, res, next) {
	res.render('post_product');
}

exports.postAddProduct=function(req, res, next) {
	res.status(200).json({message: 'add product'});
}

//thông tin người bản
exports.sellerContact= function(req,res,next){

}