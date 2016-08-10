var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.find());
});

router.get('/:username', function (req, res, next) {
  User.findOne({
    username: req.params.username
  }, function (err, user) {
    if (err) throw err;
    res.json({success: true, user: user});
  })
});


router.post('/signup', function (req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.fname || !req.body.lname) {
    res.json({ success: false, msg: "Please pass all required parameters" });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname
    });

    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'User already exists' });
      }
      res.json({ success: true, msg: 'Successfully created new user' });
    })
  }
});

router.post('/authenticate', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.send({ success: false, msg: 'Authentication failed. User not found' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.encode(user, config.secret);
          res.json({ success: true, user: user, token: 'JWT ' + token });
        } else {
          res.send({ success: false, msg: 'Authentication failed. Wrong password' });
        }
      });
    }
  });
});

module.exports = router;
