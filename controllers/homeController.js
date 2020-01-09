var express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
//trang chủ
exports.homePage=function(req,res,next){
	res.render('index');
}

//trang đăng nhập
exports.loginPage=function(req,res,next){
	res.render('login');
}

exports.viewUserInfo = function(req,res,next){
	let id = req.query.id;
	User.findById(id).populate({path:'reviews',options:{populate:{path:'reviewedByUserId'},sort:{created_at:-1}}}).exec(function(err,user){
		if(err){
			return res.status(503).send({message:'server error'});
		}
		if(!user){
			return res.status(404).send({message:'not found'});	
		}
		else{
			return res.render('./guest_view/seller_info',{seller:user});
		}
	})
}

exports.viewUserPost = function(req,res,next){
	let id = req.query.id;
	User.findById(id).populate({path:'products',match:{deleted_at:null,pending:2}}).exec(function(err,userPosts){
		if(err){
			return res.status(503).send({message:'server error'});
		}
		if(!userPosts){
			return res.status(404).send({message:'not found'});	
		}
		else return res.render('./guest_view/list_post',{seller:userPosts});
	})
}