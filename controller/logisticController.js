var orderModel = require('../model/order');
var adminModel = require('../model/admin');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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







exports.authenticate = function(req,res){
  let check;
  console.log("data submited for user login ");
  console.log(req.body);


adminModel.find({emailid:req.body.emailid}).then((user)=>{
 console.log("data return by db "+user)
  console.log("password by user "+req.body.password)
  
  bcrypt.compare(req.body.password,user[0].password, function(err, result) {
    // res == true
    if(err){ console.log("error : "+err)
      res.send("error");
    }
    else if(result){
      const token = jwt.sign({emailid: user[0].emailid, userid:user[0]._id },'this_is_secret_for_hashing')
      console.log("token generated "+token)
      res.status(200).json({token: token,emailid:user[0].emailid,name:user[0].name})
    }else{
      res.send("")
    }
});

}).catch(err=>{  res.send("") })
}
