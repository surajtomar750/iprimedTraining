var orderModel = require('../model/order');

exports.getOrders = function(req,res){
    orderModel.find({},function(err,data){
      if(err){
        console.log("error "+err)
        res.send('')
      }
      res.send(data)
    })
}

exports.updateOrder = function(req,res){
  console.log("status is "+req.body.status)
  orderModel.findByIdAndUpdate(req.body._id,{$set:req.body},function(err,data){
    if(err){
      console.log("error "+err)
      res.send("")
    }else{
      res.send("success");
    }
  })
}
