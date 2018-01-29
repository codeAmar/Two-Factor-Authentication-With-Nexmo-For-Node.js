var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('verify',{title:'verify page'});
});

module.exports = router;
