const mongoose = require('mongoose');
const schema = mongoose.Schema;

var cartSchema = schema({
    userid:Number,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    uNumber:Number
});
module.exports = mongoose.model("cart",cartSchema);