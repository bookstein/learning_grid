var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

console.log('loading the name endpoint')
router.get('/:name', function (req, res, next) {
  console.log(req.params.name)
  res.send(req.params.name)
})
module.exports = router;
