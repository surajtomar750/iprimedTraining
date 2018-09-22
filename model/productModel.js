const mongoose = require('mongoose');
const schema = mongoose.Schema;

var productSchema = schema({
    name:String,
    id:Number,
    price:String,
    description:String,
    image:String
});
module.exports = mongoose.model("product",productSchema);