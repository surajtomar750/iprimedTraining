const mongoose = require('mongoose');
const schema = mongoose.Schema;

var cartSchema = schema({
    userid:Number,
    name:String,
    price:String,
    quantity:Number 
});
module.exports = mongoose.model("cart",cartSchema);