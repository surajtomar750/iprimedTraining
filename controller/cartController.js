const cartModel = require('../model/cart');

exports.getCart = (req,res)=>{
  console.log("req params "+req.params.emailid)
cartModel.find({},function(err,data){
    if(err) {throw err}
    console.log("data return by mongodb "+data)
    res.send(data)
})
}


exports.addProductToCart = (req,res)=>{
    let pObject = cartModel({
        emailid:req.body.userId,
        name:req.body.name,
        price:req.params.price,
        quantity:req.params.qantity
    });

    pObject.save(function(err,data){
        res.send("product added with id: "+data._id+" into the database");
    });
    }
