var express = require('express');
var schemas = require('../models/schemas.js');
var _ = require('lodash');
var db = require('../dbhelper/dbconnect.js');
var mongoose = require('mongoose');
var guid = require('node-uuid');

var User = function (data) {
    console.log("Instantiate new user");
    this.data = this.sanitize(data);
    this.data.id = db.getId(); 
    console.log(this.data);
}

User.prototype.save = function (callback) {
    this.data = this.sanitize(this.data);
    data = this.data
    db.save(db.model(function () {
        console.log(data);
        return data;
    }));
}

User.prototype.sanitize = function (data) {
    data = data || {};
    schema = schemas.user;
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

module.exports = User;