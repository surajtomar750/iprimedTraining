const express = require('express')
const pController = require('../controller/productController')
const mRouter = express.Router();


mRouter.get('/',(req,res)=>{
    res.send("nothing is here");
    
    });
mRouter.get('/product',(req,res)=>{
    res.send("this is product");
    });

mRouter.get('/login',(req,res)=>{
        res.send("login is working");
    });


mRouter.get('/products',(req,res)=>{
    console.log("products requested")
   // pController.getProducts(req,res);
    });
    
mRouter.get('/product/:index',(req,res)=>{
    
    res.send(products[req.params.index]);
    
    });
    
    mRouter.post('/login',(req,res)=>{
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
    
    mRouter.get('/Status',(req,res)=>{
        
        res.status(404).send("this is a custom status code");
        
    });
    
 
    
    mRouter.get(/.*fly$/,(req,res)=>{
        res.send(req.url);
    });

module.exports = mRouter;