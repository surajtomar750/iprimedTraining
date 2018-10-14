const mongoose = require('mongoose');
const schema = mongoose.Schema;

var usersSchema = schema({
    name:String,
    number:Number,
    emailid:{type:String,unique:true},
    password:String,

});
module.exports = mongoose.model("users",usersSchema);
