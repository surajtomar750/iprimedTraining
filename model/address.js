const mongoose = require('mongoose');
const schema = mongoose.Schema;

var addressSchema = schema({
    emailid:String,
    name:String,
    number:Number,
    pin:Number,
    locality:String,
    address:String,
    city:String,
    state:String,
    landmark:String,
    altnumber:Number


});
module.exports = mongoose.model("address",addressSchema);
