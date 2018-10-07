var adminModel = require('../model/admin')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')

exports.signup = function(req,res){
  console.log("new admin is being registered "+req.body.name)
  console.log("new admin is being registered "+req.body.emailid)
  console.log("new admin is being registered "+req.body.password)
  let hash = bcrypt.hashSync(req.body.password);
  console.log(hash)
  let aObject =new adminModel({
    name:req.body.name,
    emailid:req.body.emailid,
    password:hash
  })


  aObject.save((err,data)=>{
    if(err){console.log(" error in admin-signup controller "+err)
      res.send();
      }
      res.send('success')
  });
}


exports.authenticate = function(req,res){
  console.log("data submited to admin login ");
  console.log(req.body);

  adminModel.findOne({emailid:req.body.emailid}).then(function(data){

      if(!data){
          console.log("error in admin controller function authenticate "+err)
          return res.status(401).json({message:"user not found"});
      }
      bcrypt.compareSync(req.body.password,data.password)
        .then(result=>{
          if(!result){
            return res.status(401).json({message:"user not found"});
          }
          const token = jwt.sign({emailid: data.emailid, userid:data._id },'this_is_secret_for_hashing',{expireIn:'1h'})

        })
  }).catch(err=>{
    return res.status(401).json({message:"user not found"});
  })

}
