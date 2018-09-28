var express = require('express');
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


app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("web-content"))

app.use('/',routes);



app.listen(8080,()=>{
    console.log("server started by suraj");
})