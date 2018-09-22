const express = require('express')
const pController = require('../controller/productController')
const router = express.Router();


router.get('/',(req,res)=>{
    pController.getProducts(req,res);
    });
router.get('/product',(req,res)=>{
    res.send("this is product");
});

router.get('/login',()=>{

})

module.exports = router;