var express = require('express');
var router = express.Router();
var request = require('request');
var database = require('../config/database');
var LINQ = require('node-linq').LINQ;

router.get('/', function (req, res, next) {
  res.json({ message: "Test" });
});

router.get('/places', function (req, res, next) {
  var searctText = req.query["search"];
  console.log(database.googleApiKey);
  var placesApi = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
  console.log(placesApi + searctText + '&types=(cities)&key=' + database.googleApiKey);
  //'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Nashv&types=(cities)&key=AIzaSyCyDpWxW1as1FPyuJ7kcgr7FzJUKWcENNo'
  request({
    url: placesApi + searctText + '&key=' + database.googleApiKey,
    method: 'GET'
  },
    function (e, r, body) {
     var places =  JSON.parse(body);
      console.log(places);
      res.json(places.predictions);
    });
});

module.exports = router;