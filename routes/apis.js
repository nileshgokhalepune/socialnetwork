var express = require('express');
var router = express.Router();
var request = require('request');
var database = require('../config/database');

router.get('/', function (req, res, next) {
  res.json({ message: "Test" });
});

router.get('/places', function (req, res, next) {
  var searctText = req.params.search;
  var placesApi = 'https://maps.googleapis.com/maps/api/place/autocomplete/';
  request.get(placesApi + 'json?' + searctText + '&types=(cities)&key=' + database.googleApiKey, function (e, r, body) {
    console.log(body);
    res.json(body);
  });
});

module.exports = router;