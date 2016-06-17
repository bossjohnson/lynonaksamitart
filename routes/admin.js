var express = require('express');
var router = express.Router();
var pg = require('pg');
var bcrypt = require('bcrypt');
var client = new pg.Client('postgres://localhost:5432/lynonsart');

client.connect();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    var password;
    client.query('SELECT password FROM admins WHERE username = \'' + req.body.username + '\'',
        function(err, result) {
            password = result.rows[0].password;
            if (bcrypt.compareSync(req.body.password, password)) {
                res.render('admin');
            } else {
                res.render('login', {
                    error: 'Invalid username and password combination'
                });
            }
        });
});

module.exports = router;
