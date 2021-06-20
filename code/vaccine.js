const express = require('express');
const router =  express.Router();
const path = require('path');
const url = require('url');
const html = require('html');
var mysql = require('mysql2');


var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
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

// view vaccine appointment
router.get('/ViewVacApp', function(req,res){
	
	res.sendFile(path.join(__dirname+'/ViewVacApp.html'));
});

router.post('/ViewVacApp', function (req, res) {
  //console.log(req.body)
  
  console.log(req.body.vac_id)
  con.query('select * from vaccine_center where centerID = ?',        
  req.body.vac_id, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    
    console.log('about to render yukk')
    res.redirect ('/yukk');
    //return console.log(result);


    
});


  //res.redirect('/success')
})
//	Add Stock
router.get('/addStock.html', function(req,res){
	
	res.sendFile(path.join(__dirname+'/addStock.html'));
});


module.exports = router ;
