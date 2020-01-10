var express = require('express');
const request = require('request');
const API_URL = 'http://localhost:3000/';
const POST_PRODUCT_URL = 'users/addProduct';
const Product = require('../models/product');


//thông tin sản phẩm
exports.productInfo = function (req, res, next) {
	Product.findOneAndUpdate({_id:req.params.id},{"$inc": { "views":1}},{new:true}, (err, doc) => {
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

exports.getOnDemand = (req, res, next) => {
  let condition = {
    deleted_at: null,
    pending: 2
  };
  let sortCond = {};
  if (req.params.sortType != undefined && req.params.sortType != "") {
    if (req.params.sortType == "priceAsc") {
      sortCond.price = 1;
    }
    if (req.params.sortType == "priceDsc") {
      sortCond.price = -1;
    }
  }

  if (req.query.type != undefined && req.query.type != "") {
    let val = req.query.type;
    let paramVals = [];
    if (val.includes(",")) {
      paramVals = val.split(",");
    }
    else {
      paramVals.push(val);
    }
    condition.categoryId = { $in: paramVals };
  }

  if (req.query.location != undefined && req.query.location != "") {
    let val = req.query.location;
    let paramVals = [];
    if (val.includes(",")) {
      paramVals = val.split(",");
    }
    else {
      paramVals.push(val);
    }
    condition.location = { $in: paramVals };
  }

  if (req.query.status != undefined && req.query.status != "") {
    let val = req.query.status;
    let paramVals = [];
    if (val.includes(",")) {
      paramVals = val.split(",");
    }
    else {
      paramVals.push(val);
    }
    condition.status = { $in: paramVals };
  }

  if (req.query.title != undefined && req.query.title != "") {
    let tmp = req.query.title;
    condition.name = { $regex: new RegExp(tmp, "i") };
  }

  if (req.query.id != undefined && req.query.id != "") {
    condition._id = mongoose.Types.ObjectId(req.query.id);
  }

  if (req.query.price != undefined && req.query.price != "") {
    condition.price = { $lt: req.query.price };
  }

  Product.searchItemOnDemand(condition, (err, respond) => {
    if (err) {
      console.log("Error finding");
      console.log(err)
    }
    else {
      // res.header("Access-Control-Allow-Origin", "*");
      res.render('category-single-product',{products:respond});
    }
  }, sortCond, req.params.nTurn * 10 + 10);
}