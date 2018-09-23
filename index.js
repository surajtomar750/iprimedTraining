var express = require('express');
var app = express();
// const mongoose = require('mongoose')

const routes = require('./route/routes');
// url="mongodb://localhost:27017/mybase"
// mongoose.connect(url);
// const dbConnection = mongoose.connection;
// dbConnection.on('open',(err)=>{
//     if(err){ throw err;}
//     console.log("connection successful with mongodb")
// });

// dbConnection.on('error', console.error.bind(console, 'connection error:'));

// 

// app.get('/',(req,res)=>{
//     res.send("hello now routing is working");
// })
app.use('/',routes);



app.listen(8080,()=>{
    console.log("server started by suraj");
})