const mongoose = require('mongoose');
const schema = mongoose.Schema;

var usersSchema = schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
});
module.exports = mongoose.model("users",usersSchema);