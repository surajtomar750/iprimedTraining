const jwt = require('jsonwebtoken');
module.exports =(req,res,next)=>{
  try{   let token = req.headers.authorization.split(" ")[1]
      jwt.verify(token,"this_is_secret_for_hashing")
      next();

  }catch(err){
    res.status(401).json({message:"auth failled"})
  }

}
