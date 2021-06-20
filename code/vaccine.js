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
  charset : 'utf8mb4',
  database: 'cloudproject'
});

/*var con = mysql.createConnection({
  username: process.env.DB_USERNAME || 'abianoor456',
  password: process.env.DB_PASSWORD || 'abiasql123456',
  host: process.env.DB_HOST || 'localhost',
  database: 'cloudproject'
});*/

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

//  get main page
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

//	Req Appointment
router.post('/ReqPost', function(req,res){
	
	console.log('ReqPost');
	console.log(req.body.user_name);
	console.log(req.body.user_age);
	
	var sql = "INSERT INTO users(userName,userAge) VALUES (?,?)";
  con.query(sql, [req.body.user_name, req.body.user_age], function (err, result) {
    if (err) throw err;
	  user_id = result.insertId;
    console.log("1 record inserted, ID: " + result.insertId);
	  console.log("Addimg into appintments table");
	
  var sql2 = "INSERT INTO vaccine_appointment (userID, centerID, dose_number) VALUES ( ?,?,?)";
    con.query(sql2, [user_id ,  req.body.vaccination_centre , req.body.dose_num], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
	res.sendFile(path.join(__dirname+'/index.html'));
	

	});

	//res.sendFile(path.join(__dirname+'/ReqApp.html'));
});
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

//Post Stock
router.post('/addStock', function(req,res){
	
	console.log('AddStock Post');
	
	con.connect(function(err) {
		if (err) throw err;
		console.log("Vac amount= "+ req.body.Vacc_Amount);
		var sql = "UPDATE vaccine_stock SET stockCount = ? WHERE vaccineName = 'pakVac' AND centerID='2'";
		
		con.query(sql,        
  req.body.Vacc_Amount, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
});


	  });

  
    res.sendFile(path.join(__dirname+'/index.html'));

});



module.exports = router ;
