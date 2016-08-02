var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session.auth);
  //res.end();
  if (req.session.auth) {
    res.render('index', { title: 'Social Network', auth: '1', screenName:  req.session.user ?  req.session.user : 'None' });
  } else {
    res.render('index', { title: 'Social Network', auth:'false', screenName:  req.session.user ?  req.session.user : 'None' });
  }
});

module.exports = router;
