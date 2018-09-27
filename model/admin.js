const mongoose = require('mongoose');
const schema = mongoose.Schema;

var adminSchema = schema({
    adminid:Number,
    firstname:String,
    lastname:String,
    email:String,
    password:String
});
module.exports = mongoose.model("admin",adminSchema);