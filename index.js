const express = require('express');
const mongoose = require('mongoose')
const app = express();
const routes = require('./route/routes');
url="mongodb://localhost:27017/mybase"
mongoose.connect(url);
const dbConnection = mongoose.connection;
dbConnection.on('open',()=>{
    console.log("connection successful with mongodb")
});
app.use(express.static('web-content'))
app.use(express.json);
app.use('/',routes);



app.listen(8080,()=>{
    console.log("server started by suraj");
})