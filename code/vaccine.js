const express = require('express');
const router =  express.Router();
const path = require('path');
const url = require('url');
const html = require('html');

//	register
router.get('/', function(req,res){
	
	res.sendFile(path.join(__dirname+'/index.html'));
});


module.exports = router ;
