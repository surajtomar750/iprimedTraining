const mongoose = require('mongoose');
const schema = mongoose.Schema;

var orderSchema = schema({
    name:String,
    emailid:String,
    password:String,
    number:Number
});
module.exports = mongoose.model("order",orderSchema);
