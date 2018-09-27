const mongoose = require('mongoose');
const schema = mongoose.Schema;

var usersSchema = schema({
    userid:Number,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    uNumber:Number
});
module.exports = mongoose.model("users",usersSchema);