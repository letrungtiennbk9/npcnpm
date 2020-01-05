var express = require('express');
var router = express.Router();
var categoryModel=require("../models/category");
var productModel = require('../models/product');

router.get('/category',function(req,res,next) {
	
	var arrCate =[
		{name:"Laptop"},
		{name:"Điện thoại"},
		{name:"Xe máy"}
	];
	categoryModel.insertMany(arrCate,function(err,docs){
		if(err){
			console.log(err);
			res.send('503');
		}
		else{
			console.log(docs);
			res.send('ok');
		}
	})

});
router.get('/product',function(req,res,next) {
	
	// var arrCate =[
	// 	{name:"Laptop"},
	// 	{name:"Điện thoại"},
	// 	{name:"Xe máy"}
	// ];
	// categoryModel.insertMany(arrCate,function(err,docs){
	// 	if(err){
	// 		console.log(err);
	// 		res.send('503');
	// 	}
	// 	else{
	// 		console.log(docs);
	// 		res.send('ok');
	// 	}
	// })
	productModel.find({name:"a "}).populate('categoryId').exec(function(err,result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
		}
	})

});
module.exports = router;

