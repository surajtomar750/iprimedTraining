var userModel = require('../model/user')
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
      res.status(200).json({token: token})
    }else{
      res.send("")
    }
});

}).catch(err=>{  res.status("") })
}
