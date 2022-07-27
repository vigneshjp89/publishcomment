const express = require('express'); //Line 1
const app = express(); //Line 2
const apiroute=require('./server/routes/api');
const port = process.env.PORT || 4000; //Line 3
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// This displays message that the server running and listening to specified port

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
// app.use(express.json({limit: '25mb'}));
// app.use(express.urlencoded({limit: '25mb'}));
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({ extended: false ,limit:'25mb'}));
app.use(cookieParser());
app.use('/api', apiroute); //Line 11
//app.use(favicon(__dirname + '/client/public/favicon.ico'));