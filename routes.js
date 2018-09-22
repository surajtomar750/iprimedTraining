var express = require('express');
var routes = express.Router();


const productsData = require('./products');
let products = productsData.products;
const usersData = require('./users');
let users = usersData.users;




routes.get('/',function(req,res){
	res.send("hello hola");
});

routes.get('/products',(req,res)=>{
res.send("<p>this is products</p>");
});

routes.get('/product/:index',(req,res)=>{

res.send(products[req.params.index]);

});

routes.post('/login',(req,res)=>{
 for(var i=0;i<users.length;i++){
	 if(users[i].userid == req.body.userid){
		 if(users[i].pass == req.body.password){
			 res.send("login successfull");
		 }else{
			res.send("incorrect user or password");
		 }
	 }else{
		res.send("user do not exist");
	 }
 }
});

routes.get('/Status',(req,res)=>{
	
	res.status(404).send("this is a custom status code");
	
});

routes.get('/image',(req,res)=>{
	res.set({'Content-Type':'text/html'});
	res.send("<img src = /image/deo.jpeg>");
});

routes.get(/.*fly$/,(req,res)=>{
	res.send(req.url);
});

module.exports = routes;