var userModel = require('../model/user')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

exports.signup = function(req,res){
  console.log("new user is being registered "+req.body.emailid)

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
        res.send("");
        }
        res.send('success')
    });
  });


}


exports.authenticate = function(req,res){
  console.log("data submited for user login ");
  console.log(req.body);
if(!(body.emailid && body.password)){
    res.send("")
}

userModel.find({emailid:req.body.emailid}).then((user)=>{
  console.log("data return by db "+user)

  bcrypt.compare(req.body.password,user[0].password, function(err, result) {
    // res == true
    if(err){
      res.send("");
    }
    else if(result){
      const token = jwt.sign({emailid: user[0].emailid, userid:user[0]._id },'this_is_secret_for_hashing')
      console.log("token generated "+token)
      res.status(200).json({token: token})
    }
});

}).catch(err=>{  res.status(404).json({message:"this is catch block, user not found \n"+err}) })
}
