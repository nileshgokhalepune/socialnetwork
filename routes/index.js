var express = require('express');
var router = express.Router();
var request = require('request');
var qs = require('querystring');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Social Network' });
});


router.get('/twitter/callback', function (req, res, next) {
  console.log(req.query.oauth_verifier);
  var data = qs.parse(req.query);

  request.post({
    url: 'https://api.twitter.com/oauth/access_token',
    method: 'POST',
    form: {
      'oauth_token': req.query.oauth_token,
      'oauth_verifier': req.query.oauth_verifier
    }
  }, function (e, resp, body) {
    var parms = qs.parse(body);
    console.log(parms);
    res.render('auth', { authToken: body });

  });

});

router.get('/social/:t/:v', function (req, res, next) {
  res.render('index', { title: res });
});

module.exports = router;
