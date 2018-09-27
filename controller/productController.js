const productModel = require('../model/product');
const mongoose = 
exports.getProducts = (req,res)=>{
productModel.find({},function(err,data){
    if(err) {throw err}
    res.send(data) 
})
}


exports.getProduct = (req,res)=>{
    productModel.find({id:req.params.id},function(err,data){
        if(err) {throw err}
        console.log("single product requested with params "+req.params.id)
        res.send(data) 
    })
    }

