var express = require('express');
let User = require('../models/user');

//thông tin sản phẩm
exports.listProduct=function(req,res,next){
	res.render('category');
}

exports.addToWishlist=function(req,res,next){
	console.log("adding to wish list...");
 //   console.log(req.query.productid);
  
    console.log(  res.locals.user._id);
    var product= {"productid":req.query.productid  };

	User.findOneAndUpdate({ _id: res.locals.user._id },  { $push : {wishlist: product }}, (err, doc) => {
        if (err) {
            console.log("faild");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
    
//    let user= User.findone({'_id':res.locals.user._id});
//    user.wishlist.push(req.query.productid);
//    console.log(user);

   
};