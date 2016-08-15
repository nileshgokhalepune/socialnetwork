var express = require('express');
var router = express.Router();
var request = require('request');
var database = require('../config/database');

router.get('/', function (req, res, next) {
  res.json({ message: "Test" });
});

router.get('/places', function (req, res, next) {
  var searctText = req.params.search;
  console.log(req.query.search);
  console.log(database.googleApiKey);
  var placesApi = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
  //'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Nashv&types=(cities)&key=AIzaSyCyDpWxW1as1FPyuJ7kcgr7FzJUKWcENNo'
  request({
    url: placesApi + searctText + '&types=(cities)&key=' + database.googleApiKey,
    method: 'GET'
  },
    function (e, r, body) {
      console.log(body);
      res.json(body);
    });
});

module.exports = router;