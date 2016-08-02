var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/auth',function(req,res,next){
  console.log('Checking Authentication');
  if(req.session.user){
    res.send(true);
  }else{
    res.send(false);
  }
})

module.exports = router;
