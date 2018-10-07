const mongoose = require('mongoose');
const schema = mongoose.Schema;

var adminSchema = schema({
    name:String,
    emailid:{type:String,unique:true},
    password:String
});
module.exports = mongoose.model("admins",adminSchema);
