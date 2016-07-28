var express = require('express');
var request = require('request');
var qs = require("querystring"),
    oauth = {
        callback: '	http://50.21.186.153/social/twitter/callback',
        consumer_key: 'IGe5AiDFqZ1wXBkWRXTgScSS4',
        consumer_secret: 'VbtFfYbOgkzN99AGH4lKE0vAIKHp8Che7xG6MGIHEZdQCl8Qu7'
    },
    url = 'https://api.twitter.com/oauth/request_token'; //URL to hit

var router = express.Router();

router.get('/', function (req, res) {

    request.post({ url: url, oauth: oauth }, function (e, r, body) {
        console.log(body);
        res.json({
                tokenUri: 'https://api.twitter.com/oauth/authorize',
                oauthData: body
            });
    });
});

module.exports = router;