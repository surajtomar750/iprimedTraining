const mongoose = require('mongoose');
const schema = mongoose.Schema;

var adminSchema = schema({
    // firstname:String,
    // lastname:String,
    emailid:String,
    password:String
});
module.exports = mongoose.model("admin",adminSchema);