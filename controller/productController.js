const productModel = require('../model/productModel');
const mongoose = 
exports.getProducts = (req,res)=>{
productModel.find({},function(err,data){
    if(err) {throw err}
    res.send(data) 
})
}

