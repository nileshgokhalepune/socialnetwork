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

    request.get({
        url: url,
        oauth: oauth
    }, function (e, r, body) {
        var userObject = JSON.parse(body);
        var userToSave = { //create user based on the information received from twitter
            username: tokens.screen_name,
            password: tokens.oauth_token,
            oauthToken: tokens.oauth_token,
            tokenSecret: tokens.oauth_token_secret,
            name: userObject.name,
            location: userObject.location,
            twitter: true,
            email: tokens.screen_name + "@twitter.com"
        };
        var formData = {
            username: tokens.screen_name,
            password: tokens.oauth_token
        };
        request.post({ //try to signup the user and save information to the database. This will create user for the first time but fail on every subsequent logins
            url: 'http://' + req.headers.host + '/users/signup',
            form: userToSave,
        }, function (e, r, body) {
            var response = JSON.parse(body);
            if (response.success) { //if user was created, internally authenticate that user and send a token back 
                authenticate(req.headers.host, formData, function (e, r, body) {
                    var body = JSON.parse(body);
                    res.json({ success: true, user: body.user, token: body.token });
                });
            } else if (!response.success && response.code && response.code === 11000) { //Thats doesnt seem the right way to do it. may need to rethink on how to tell the front end what went wrong.
                //if we are here, that means the user is already there and we just need to authenticate and send the ticket.
                authenticate(req.headers.host, formData, function (e, r, body) {
                    var body = JSON.parse(body);
                    if (body.success) {
                        res.json({ success: true, user: body.user, token: body.token });
                    }
                });
            } else { //if we are here, something went wrong which we dont know about. notify the front end accordingly.
                res.json({ success: false, msg: 'Complete Registration', userData: userToSave });
            }
        });
    });
});

function authenticate(host, formData, callback) {
    request({
        url: 'http://' + host + '/users/authenticate',
        method: 'POST',
        form: formData
    }, function (e, r, body) {
        callback(e, r, body);
    });
}

module.exports = router;