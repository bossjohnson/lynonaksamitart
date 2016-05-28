var express = require('express');
var router = express.Router();
var fs = require('fs');



/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readdir('public/images/art', function(err, images) {
      res.render('index', {images: images});
    });
});

module.exports = router;
