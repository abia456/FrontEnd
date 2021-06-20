const express = require('express');
const router =  express.Router();
const path = require('path');
const url = require('url');
const html = require('html');
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "amnabhatti",
  database: 'cloudproject'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
con.query('select * from users', function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
});

//	register
router.get('/', function(req,res){
	
	res.sendFile(path.join(__dirname+'/index.html'));
});

//	Req Appointment
router.get('/ReqApp', function(req,res){
	
	res.sendFile(path.join(__dirname+'/ReqApp.html'));
});


//	Add Stock
router.get('/addStock.html', function(req,res){
	
	res.sendFile(path.join(__dirname+'/addStock.html'));
});


module.exports = router ;
