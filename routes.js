const express = require('express')
const pController = require('./controller/productController')
const mRouter = express.Router();
const path = require('path');


// mRouter.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/web-content/index.html'));
    
//     });

// mRouter.get('/:dir/:filename',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/web-content/'+req.params.filname));
// })

// mRouter.get('/:dir/:filename',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/web-content/'+req.params.filname));
// })

// mRouter.get('/:dir/:filename',(req,res)=>{
//     res.sendFile(path.join(__dirname+'/web-content/'+req.params.filname));
// })

// mRouter.get('/product',(req,res)=>{
//     res.send("this is product");
//     });




mRouter.get('/products',(req,res)=>{
    console.log("products requested")
    pController.getProducts(req,res);
    });
    
mRouter.get('/product/:name',(req,res)=>{
    
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
    
 
    
    // mRouter.get(/.*.htm$/,(req,res)=>{
    //     res.sendFile(path.join(__dirname+'/web-content/'+req.url));
    // });

module.exports = mRouter;