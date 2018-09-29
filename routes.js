const express = require('express')


            
const pController = require('./controller/productController')
const mRouter = express.Router();
const path = require('path');

mRouter.get('/admin',(req,res)=>{
    res.sendFile(__dirname+"/web-content/admin.html");
})
mRouter.post('/adminaddproduct', function (req, res) {
    console.log("admin requested to add product : weldone admin")
    pController.setProducts(req,res);
    
})

mRouter.post('/signUpData',(req,res)=>{
         res.send("not working");
})

mRouter.get('/cart/:userId',(req,res)=>{
    res.send("this is product");
    });




mRouter.get('/products',(req,res)=>{
    console.log("products requested")
    pController.getProducts(req,res);
    });
    
mRouter.get('/product/:id',(req,res)=>{
    
    pController.getProduct(req,res);
    
    });
    
    mRouter.post('/LoginData',(req,res)=>{
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
    
 
    
   

module.exports = mRouter;