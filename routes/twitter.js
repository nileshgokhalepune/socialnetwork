var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var htmlDecode = require('js-htmlencode').htmlDecode;
var router = express.Router();
var request = require('request');
var User = require('../models/user.js');
var secret = "shhhhhared_secret";
var twitterKey = 'twitter';

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

router.get('/:oauth_token', function (req, res, next) {
    var decoded = req.params.oauth_token.replace(/&amp;/g, '&'); //htmlDecode(req.params.oauth_token);
    console.log('\033[2J');
    console.log(decoded);
    var tokens = qs.parse(decoded);
    var user = new userModel({ username: tokens.screen_name, oauthToken: tokens.oauth_token, tokenSecret: tokens.oauth_token_secret });
    console.log(user);
    user.findUser(JSON.stringify({ username: tokens.screen_name, twitter: true }), function (errr, users) {
        var temp = users.length === 1 ? users[0] : user;
        if (users.length === 1) {
            if (temp.oauthToken === tokens.oauth_token) {
                console.log('Auth token matches');
            }
        } else if (users.length === 0) {
            user.save();
        }

        var token = jwt.sign({ token: temp.oauthToken, secret: temp.tokenSecret }, secret);
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.stringify({ token: token, username: temp.username }));
    });
});

module.exports = router;