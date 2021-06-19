const express = require('express');
const path = require('path');



const app = express();
const http = require("http").createServer(app);
//Static folder, public foldeer
app.use(express.static('public'));


let vaccine = require('./vaccine');
app.use('/',vaccine);

http.listen(8000, function(){
	
	console.log('Server started');
});

