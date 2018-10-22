var userModel = require('../model/user')
var orderModel = require('../model/order')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

exports.signup = function(req,res){
  console.log("new user is being registered "+req.body.emailid)
//
  // userModel.find({emailid:req.body.emailid}).then((userFromDB)=>{
  //       console.log("data return by database while signup "+userFromDB)
  //
  // })

  let uObject;
  bcrypt.hash(req.body.password,10,function(err,hash){
    uObject =new userModel({
      name:req.body.name,
      emailid:req.body.emailid,
      number:req.body.number,
      password:hash
    })


    uObject.save((err,data)=>{
      if(err){console.log(" error in user controller "+err)
        res.send("exist");
      }else{
        res.send('success')
      }

    });
  });


}


exports.authenticate = function(req,res){
  let check;
  console.log("data submited for user login ");
  console.log(req.body);


userModel.find({emailid:req.body.emailid}).then((user)=>{
 console.log("data return by db "+user)

  bcrypt.compare(req.body.password,user[0].password, function(err, result) {
    // res == true
    if(err){
      res.send("error");
    }
    else if(result){
      const token = jwt.sign({emailid: user[0].emailid, userid:user[0]._id },'this_is_secret_for_hashing')
      console.log("token generated "+token)
      res.status(200).json({token: token,emailid:user[0].emailid,name:user[0].name,number:user[0].number})
    }else{
      res.send("")
    }
});

}).catch(err=>{  res.send("") })
}



exports.placeOrder = function(req,res){
  console.log(req.body.emailid)

    let oObject = new orderModel({
      emailid:req.body.emailid,
      name:req.body.name,
      product_id:req.body.product_id,
      number:req.body.number,
      quantity:req.body.quantity,
      price:req.body.price
    })

    oObject.save(function(err,data){
      if(err){
        console.log("error while saving data "+err)
        res.send("")
      }else{
        console.log("order placed successfully")
        res.send('success');
      }
    })
}

exports.placeMultiOrder = (req,res)=>{
  for(let i=0;i<req.body.orders.length;i++){
    let oObject = new orderModel({
      emailid:req.body.orders[i].emailid,
      name:req.body.orders[i].name,
      product_id:req.body.orders[i].product_id,
      number:req.body.orders[i].number,
      quantity:req.body.orders[i].quantity,
      price:req.body.orders[i].price
    })

    oObject.save(function(err,data){
      if(err){
        console.log("error while saving data "+err)
        res.send("")
        return;
      }
    })

    res.send('success')


  }
}



exports.getOrder = function(req,res){
    orderModel.find({emailid:req.params.emailid},function(err,data){
      console.log("response by mongodb : "+data)
      if(err){
        console.log("error "+err)
        res.send('')
      }
      res.send(data)
    })
}



exports.setCart = function(req,res){
  let undef;
    console.log('seting cart : req.body')
    try{
        
    }
    catch(err){
      console.log('error occurred: '+err)
    }
}


exports.getCart = function(req,res){
    cartModel.find({emailid:req.params.emailid},function(err,data){
      console.log("response by mongodb : "+data)
      if(err){
        console.log("error "+err)
        res.send('')
      }
      res.send(data)
    })
}
