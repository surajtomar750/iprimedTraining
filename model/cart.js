const mongoose = require('mongoose');
const schema = mongoose.Schema;

var cartSchema = schema({
    emailid:String,
    product_id:{type:String},
    name:String,
    price:String,
    quantity:Number,
    image:String
});
module.exports = mongoose.model("carts",cartSchema);
