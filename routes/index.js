var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.parms);
  //res.end();
  if (req.params.auth) {
    res.render('index', { title: 'Social Network', auth: 'true' });
  } else {
    res.render('index', { title: 'Social Network', auth:'false' });
  }
});

module.exports = router;
