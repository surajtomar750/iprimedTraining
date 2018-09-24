const productModel = require('../model/productModel');
const mongoose = 
exports.getProducts = (req,res)=>{
productModel.find({},function(err,data){
    if(err) {throw err}
    res.send(data) 
})
}


exports.getProduct = (req,res)=>{
    productModel.find({name:req.params.name},function(err,data){
        if(err) {throw err}
        console.log("single product requested with id "+req.params.name)
        res.send(data) 
    })
    }

