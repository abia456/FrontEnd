const express = require('express');
const path = require('path');



const app = express();
app.set('view engine', 'ejs');
const http = require("http").createServer(app);
var bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//Static folder, public foldeer
app.use(express.static(path.join(__dirname,'public')));


let vaccine = require('./vaccine');
app.use('/',vaccine);
app.set('views', path.join(__dirname, '/views'));


http.listen(8000, function(){
	
	console.log('Server started');
});