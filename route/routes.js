const express = require('express')
const pController = require('../controller/productController')
const router = express.Router();


router.get('/',(req,res)=>{
    res.send("nothing is here");
    
    });
router.get('/product',(req,res)=>{
    res.send("this is product");
    });

router.get('/login',()=>{

    });


router.get('/products',(req,res)=>{
    console.log("products requested")
    pController.getProducts(req,res);
    });
    
router.get('/product/:index',(req,res)=>{
    
    res.send(products[req.params.index]);
    
    });
    
    router.post('/login',(req,res)=>{
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
    
    router.get('/Status',(req,res)=>{
        
        res.status(404).send("this is a custom status code");
        
    });
    
 
    
    router.get(/.*fly$/,(req,res)=>{
        res.send(req.url);
    });

module.exports = router;