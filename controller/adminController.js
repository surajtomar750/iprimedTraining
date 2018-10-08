var adminModel = require('../model/admin')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

exports.signup = function(req,res){
  console.log("new admin is being registered "+req.body.name)
  console.log("new admin is being registered "+req.body.emailid)
  console.log("new admin is being registered "+req.body.password)
  let aObject;
  bcrypt.hash(req.body.password,10,function(err,hash){
    aObject =new adminModel({
      name:req.body.name,
      emailid:req.body.emailid,
      password:hash
    })


    aObject.save((err,data)=>{
      if(err){console.log(" error in admin-signup controller "+err)
        res.send("");
        }
        res.send('success')
    });
  });


}


exports.authenticate = function(req,res){
  console.log("data submited to admin login ");
  console.log(req.body);


adminModel.find({emailid:req.body.emailid}).then((user)=>{
  console.log("data return by db "+user)
  console.log(user[0].password);
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
