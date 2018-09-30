var express = require('express');
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
// headers and content type
app.use(function (req, res, next) {
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.static(path.join(__dirname, 'web-content')))

app.use('/',routes);



app.listen(8080,()=>{
    console.log("server started by suraj");
})