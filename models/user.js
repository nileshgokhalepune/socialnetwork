var mongoose = require('mongoose');
var schemas = require('./models/schemas.js');
var _  = require('lodash');

var User = function (data) {
    this.data = this.sanitize(data);
}

User.prototype.save = function (callback) {
    this.data = this.sanitize(this.data);
}

User.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = User;