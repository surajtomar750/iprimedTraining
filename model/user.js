const mongoose = require('mongoose');
const schema = mongoose.Schema;

var usersSchema = schema({
    id:String,
    name:String,
    number:Number,
    email:String,
    password:String,
    
});
module.exports = mongoose.model("users",usersSchema);