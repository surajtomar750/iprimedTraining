const cartModel = require('../model/cart');

exports.getProductsFromCart = (req,res)=>{
cartModel.find({userid:req.params.userId},function(err,data){
    if(err) {throw err}
    res.send(data) 
})
}


exports.addProductToCart = (req,res)=>{
    let pObject = cartModel({
        userid:req.body.userId,
        name:req.body.name,
        price:req.params.price
    });

    pObject.save(function(err,data){
        res.send("product added with id: "+data._id+" into the database");
    });
    }