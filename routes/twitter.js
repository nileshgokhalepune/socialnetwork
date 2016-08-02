var express = require('express');
var router = express.Router();
var request = require('request');
var qs = require("querystring"),
    oauth = {
        //callback: '	http://50.21.186.153/social/twitter/callback',
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

router.get('/:oauth_token/:oauth_secret', function (req, res) {
    console.log(req);
    res.redirect(302, '/social/');
});

module.exports = router;

