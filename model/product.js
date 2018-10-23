const mongoose = require('mongoose');
const schema = mongoose.Schema;

var productSchema = schema({
    name:{type:String,unique:true},
    price:Number,
    description:String,
    category:String,
    image:Array
});
module.exports = mongoose.model("products",productSchema);
