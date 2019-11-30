var express = require('express');

//tìm kiếm
exports.searchPage=function(req,res,next){
	res.render('search');
}