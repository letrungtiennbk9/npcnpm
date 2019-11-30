var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');

//trang tìm kiếm
router.get('/', searchController.searchPage);

module.exports = router;
