var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //console.log(req.session.auth);
  res.render('index', {title:'Social Network'});
});

module.exports = router;
