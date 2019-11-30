var express = require('express');

//trang chủ
exports.homePage=function(req,res,next){
	res.render('index');
}

//trang đăng ký
exports.registerPage= function(req,res,next){
	res.render('register');
}

//trang đăng nhập
exports.loginPage=function(req,res,next){
	res.render('login');
}