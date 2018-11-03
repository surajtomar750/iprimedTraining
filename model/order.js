const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orderSchema = schema({
    name:String,
    product_id:String,
    emailid:String,
    number:Number,
    quantity:Number,
    price:Number,
    status:String,
    address:Object
});
module.exports = mongoose.model("order",orderSchema);
