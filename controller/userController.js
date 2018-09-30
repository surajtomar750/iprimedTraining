const userModel = require('../model/user')

exports.authenticateUser = (req,res)=>{

}

exports.registerUser = (req,res)=>{
  let uObject = new userModel({
      id:req.body.userId,
      name:req.body.userName,
      number:req.body.userNumber,
      email:req.body.userEmail,
      password:req.body.userPassword

  });

  uObject.save((err,data)=>{
      if(err) {
        console.log(err);
        res.redirect('/signup')
    }
      res.redirect('/account/'+data.id)
  })
}