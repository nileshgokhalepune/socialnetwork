var mongoose = require('mongoose');
var database = require('../config/database');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    location: String,
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: String,
    interest: String,
    dobDay: Number,
    dobMonth: Number,
    dobYear: Number,
    twitter: Boolean,
    facebook: Boolean,
    googleplus: Boolean,
    oauthToken: String,
    tokenSecret: String,
    isProfileComplete: Boolean,
    phoneNumber: String,
    gender: String
});

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        return next();
    }
    return next();
});

userSchema.methods.comparePassword = function (passw, cb) {
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