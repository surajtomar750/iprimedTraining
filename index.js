var express = require('express');
var session = require('express-session')
var cookieParser = require('cookie-parser')
var path = require('path')
var app = express();
var bodyparser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes');

url="mongodb://localhost:27017/mydb"
mongoose.connect(url,{ useNewUrlParser: true });
const dbConnection = mongoose.connection;
dbConnection.on('open',()=>{
    console.log("connection successful with mongodb")
});

dbConnection.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyparser.json()); // for parsing application/json
app.use(bodyparser.urlencoded({extended:true}));

app.use(cookieParser());
// headers and content type
app.use(function (req, res, next) {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.


app.use(express.static(path.join(__dirname, 'web-content')))

app.use('/',routes);



app.listen(8080,()=>{
    console.log("server started at port 8080");
})
