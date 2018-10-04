const mongoose = require('mongoose');
const schema = mongoose.Schema;

var productSchema = schema({
    id:String,
    name:String,
    price:String,
    description:String,
    category:String,
    image:Array
});
module.exports = mongoose.model("products",productSchema);