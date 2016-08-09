var express = require('express');
var mongoose = require('mongoose');
var ObjectID  =require('mongodb').ObjectID;
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


if (env === 'development') {
    mongoose.connect('mongodb://localhost/socialnetwork');
} else {
    mongoose.connect('mongodb://nilesh:multivision@ds027145.mlab.com:27145/mutlivision');
}
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error..."));

db.once('open', function callback() {
    console.log('socialnetwork database opened');
});


var dbConnect=  {
    save: function () {
        
    },
    
    model: function (callback) {
        return mongoose.Schema(callback());
    },
    
    getId: function(){
        var id =  new ObjectID();
        console.log(id);
        return id ;
    }
};

// dbConnect.prototype.model = function(callback) {
//     return mongoose.schema(callback());
// }

module.exports = dbConnect;