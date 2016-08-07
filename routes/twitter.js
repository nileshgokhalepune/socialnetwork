var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var htmlDecode = require('js-htmlencode').htmlDecode;
var router = express.Router();
var request = require('request');
var user = require('./models/user');
var secret = "shhhhhared_secret";

var qs = require("querystring"),
    oauth = {
        consumer_key: 'IGe5AiDFqZ1wXBkWRXTgScSS4',
        consumer_secret: 'VbtFfYbOgkzN99AGH4lKE0vAIKHp8Che7xG6MGIHEZdQCl8Qu7'
    },
    url = 'https://api.twitter.com/oauth/request_token'; //URL to hit

router.get('/', function (req, res) {
    request.post({ url: url, oauth: oauth }, function (e, r, body) {
        res.json({
            tokenUri: 'https://api.twitter.com/oauth/authorize',
            oauthData: body
        });
    });
});

router.get('/callback', function (req, res, next) {
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
        res.render('auth', { authToken: body, provider: 'twitter' });
    });

});

router.get('/:oauth_token', function (req, res) {
    var decoded = htmlDecode(req.params.oauth_token);
    var tokens = qs.parse(decoded);
    var token = jwt.sign(tokens, secret);
    console.log("Nilesh\r\n" + token);
    use
    console.log(helpers)
    res.json(token);
});

module.exports = router;

