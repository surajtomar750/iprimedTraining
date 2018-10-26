var userModel = require('../model/user')
var orderModel = require('../model/order')
var cartModel = require('../model/cart')
var address = require('../model/address')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var _ = require('underscore');

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
  console.log(req.body)

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
  let result=true;
  console.log("items in the cart to be placed : "+req.body.orders.length)
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
        result=false
      }else{
        console.log("item "+i+" has been saved")
      }
    })

  }

  if(result){
    res.send('success')
  }else {
    res.send('')
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
        let exists=false;
        let product;
        console.log('emailid  is : '+req.body.emailid)
        cartModel.find({emailid:req.body.emailid},function(err,data){
          if(err){
            console.log('error:line 144 : '+err)
            res.send('')
            return;
          }
          //console.log('data from database '+data)
          console.log(!_.isEqual(data,null))

          if(!_.isEqual(data,null)){
            for(let i=0; i<data.length && exists != true;i++){
              if(data[i].name==req.body.name){
                exists =  true
                product = data[i]
              }
            }
            if(!exists){
              console.log('product not exists')
              let cObject = new cartModel({
                emailid:req.body.emailid,
                product_id:req.body.product_id,
                name:req.body.name,
                price:req.body.price,
                quantity:req.body.quantity,
                image:req.body.image
              })

              cObject.save(function(err,data){
                if(err){
                  console.log('error : '+err)
                  res.send('')
                }else{
                  res.send('success')
                }
              })
            }else{
              console.log('product exists')
              console.log(data._id)
              product.quantity=product.quantity+1
              let cObject = {
                _id:product._id,
                emailid:req.body.emailid,
                product_id:req.body.product_id,
                name:req.body.name,
                price:req.body.price*product.quantity,
                quantity:product.quantity,
                image:req.body.image
              }

              cartModel.findByIdAndUpdate(product._id,{$set:cObject},(err,newdata)=>{
                if(err){
                  console.log('ERROR: '+err)
                  res.send('')
                }else { console.log('updateting quantity')
                  res.send('updated')
                }
              })
            }






          }else {
            console.log('product not exists')
          }
        })

        // if(!exists){
        //   console.log('product not exists')
        //   let cObject = new cartModel({
        //     emailid:req.body.emailid,
        //     product_id:req.body.product_id,
        //     name:req.body.name,
        //     price:req.body.price,
        //     quantity:req.body.quantity,
        //     image:req.body.image
        //   })
        //
        //   cObject.save(function(err,data){
        //     if(err){
        //       console.log('error : '+err)
        //       res.send('')
        //     }else{
        //       res.send('success')
        //     }
        //   })
        // }
        // else if(exists){
        //   console.log('product exists')
        //   let cObject = {
        //     _id:product._id,
        //     emailid:req.body.emailid,
        //     product_id:req.body.product_id,
        //     name:req.body.name,
        //     price:req.body.price,
        //     quantity:parseInt(req.body.quantity)+1,
        //     image:req.body.image
        //   }
        //
        //   cartModel.findByIdAndUpdate(product._id,{$set:cObject},(err,data)=>{
        //     if(err){
        //       console.log('ERROR: '+err)
        //       res.send('')
        //     }else {
        //       res.send('success')
        //     }
        //   })
        // }

}


exports.getCart = function(req,res){
    cartModel.find({emailid:req.params.emailid},function(err,data){

      if(err){
        console.log("error "+err)
        res.send('')
        return;
      }
      res.send(data)
    })
}

exports.removeFromCart = function(req,res){
  cartModel.findByIdAndDelete(req.params.id,(err)=>{
      if(err){
          console.log("error in removeProduct function "+err)
          res.send("error")
      }else{
         res.send("success");
      }
})}

exports.setAddress = function(req,res){
  let aObject = new address({
    emailid:req.body.emailid,
    name:req.body.name,
    number:req.body.number,
    pin:req.body.pin,
    locality:req.body.locality,
    address:req.body.address,
    city:req.body.city,
    state:req.body.state,
    landmark:req.body.landmark,
    altnumber:req.body.altnumber
  })
}