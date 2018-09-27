const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orderSchema = schema({
    userid:Number,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    uNumber:Number
});
module.exports = mongoose.model("order",orderSchema);