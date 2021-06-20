const express = require('express');
const router =  express.Router();
const path = require('path');
const url = require('url');
const html = require('html');
var mysql = require('mysql2');


var con = mysql.createConnection({
  host: "localhost",
  user: "abianoor456",
  password: "abiasql123456",
  
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
  con.query('select * from vaccine_appointment where centerID = ?' ,       
  req.body.vac_id, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    
    console.log(result[1])
    //res.redirect('/?valid=' + result);
    return res.render ('yukk.ejs', {centerLoc:result});
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
	var exists=0;
	con.connect(function(err) {
		if (err) throw err;
		console.log("Vac amount= "+ req.body.Vacc_Amount);
    console.log("Vac amount= "+ req.body.user_job);
    console.log("Vac amount= "+ req.body.Vaccine_name);

    con.query('select * from vaccine_stock WHERE vaccineName = ? AND centerID=?',        
  [req.body.Vaccine_name,req.body.user_job], function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    console.log(result);

    //not an already existing record
    if(result.length<1){
      console.log("lenght=0");
      exists=0;
      
    console.log("Inserting");

    var sql4 = "select * from vaccines WHERE vaccineName = ?";
    con.query(sql4, req.body.Vaccine_name, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);

      if(result.length<1) //vaccine does not exist in vaccine
      {
        var sql1 = "INSERT INTO vaccines (vaccineName, minAge, WeeksBetweenDoses,numberOfDoses) VALUES ( ?,?,?,?)";
        con.query(sql1, [req.body.Vaccine_name,'18','20','2'], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
      });
      }

    });
 

    var sql2 = "INSERT INTO vaccine_stock (stockCount, vaccineName, centerID) VALUES ( ?,?,?)";
    con.query(sql2, [req.body.Vacc_Amount,req.body.Vaccine_name,req.body.user_job], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
	res.sendFile(path.join(__dirname+'/index.html'));
	

	});



    } 
    else{
      
      exists=1;
      console.log("lenght= "+ exists);

      console.log("UPDATING");

		var sql = "UPDATE vaccine_stock SET stockCount = ? WHERE vaccineName = ? AND centerID=?";
		
		con.query(sql,        
    [req.body.Vacc_Amount,req.body.Vaccine_name,req.body.user_job], function(err, result, fields) 
    {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
    });
    }

  });

  if(exists==0)
  {
  }
  else{
    

  } 
	  });

  
    res.sendFile(path.join(__dirname+'/index.html'));

});



module.exports = router ;
