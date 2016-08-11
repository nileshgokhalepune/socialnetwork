var express = require('express');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var htmlDecode = require('js-htmlencode').htmlDecode;
var router = express.Router();
var request = require('request');
var User = require('../models/user.js');
var twitterKey = 'twitter';
var database = require('../config/database.js');
//var userapi = require('../routes/users.js');

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
    var url = 'https://api.twitter.com/1.1/users/show.json?screen_name=' + tokens.screen_name + '&user_id=' + tokens.screen_name;
    var oauth = {

    }

    request.post({
        url: 'http://' + req.headers.host + '/users/signup',
        form: {
            username: tokens.screen_name,
            password: tokens.oauth_token,
            oauthToken: tokens.oauth_token,
            tokenSecret: tokens.oauth_token_secret,
            fname: tokens.screen_name,
            lname: tokens.screen_name
        },
    }, function (e, r, body) {
        var response = JSON.parse(body);
        if (!response.success) {
            request({
                url: 'http://' + req.headers.host + '/users/authenticate',
                method: 'POST',
                form: {
                    username: tokens.screen_name,
                    password: tokens.oauth_token
                }
            }, function (e, r, body) {
                var response = JSON.parse(body);
                if (response.success) {
                    res.json({ user: user, token: response.token });
                }
            });
        }
    });
});

module.exports = router;