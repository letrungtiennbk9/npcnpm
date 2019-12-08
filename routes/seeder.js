var express = require('express');
var router = express.Router();
var categoryModel=require("../models/category")

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
module.exports = router;

