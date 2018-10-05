var admin = require('../model/admin')

var bodyParser = require('body-parser')

exports.authenticate = function(req,res){
console.log(req.body.emailid);
console.log(req.body.password);

admin.find({},function(err,data){
    console.log("database returns "+data)
    if(err){
        console.log("error in admin controller "+err)
    }
    else if(data.password==req.body.password){
        console.log("login success")
        res.send("true");

    }else{ console.log("login failed")
    console.log(data.password)
        res.send();
    }

})

}
