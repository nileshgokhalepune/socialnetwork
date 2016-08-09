var mongoose = require('mongoose');
var database = require('../config/database');
var Schema = mongoose.Schema;

// mongoose.connect(database.url);
var db = mongoose.connection;

// db.on('error',console.error.bind(console,'connection error'));
// db.once('open',function(){
//     console.log('connected');
// })

var userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    password: String,
    twitter: Boolean,
    facebook: Boolean,
    googleplus: Boolean,
    oauthToken: String,
    tokenSecret: String
});

userSchema.methods.findUser = function (query, callback) {
    this.model('Users').find(query, callback);
}

userSchema.methods.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

userModel = mongoose.model('Users', userSchema);

module.exports = userModel;