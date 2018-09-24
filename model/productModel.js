const mongoose = require('mongoose');
const schema = mongoose.Schema;

var productSchema = schema({
    _id:String,
    name:String,
    id:Number,
    price:String,
    description:String,
    image:String
});
module.exports = mongoose.model("products",productSchema);