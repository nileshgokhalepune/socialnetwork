var mongoose = require('mongoose');
var database = require('../config/database');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fname: String,
    lname: String,
    password: String,
    twitter: Boolean,
    facebook: Boolean,
    googleplus: Boolean,
    oauthToken: String,
    tokenSecret: String
});

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        return next();
        // bcrypt.genSalt(10, function (err, salt) {
        //     if (err) {
        //         return next(err);
        //     }
        //     bcrypt.hash("B4c0/\/", salt, function (err, hash) {
        //         if (err) {
        //             return next(err);
        //         }
        //         user.password = hash;
        //         return next();
        //     });
        // });
    }
    return next();
});

userSchema.methods.comparePassword = function (passw, cb) {
    //bcrypt.compareSync(passw, this.password);
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

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