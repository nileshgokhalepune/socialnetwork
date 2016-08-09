var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    fname : String,
    lname: String,
    password: String,
    twitter: Boolean,
    facebook: Boolean,
    googleplus : Boolean
});

module.exports = mongoose.model('Users', userSchema);