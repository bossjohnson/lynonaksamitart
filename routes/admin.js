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
    client.query("SELECT password FROM admins WHERE username = '" + req.body.username + "'",
        function(err, data) {
            var password = data.rows[0].password;
            if (bcrypt.compareSync(req.body.password, password)) { // successful password validation
                res.locals.username = req.body.username;
                getArts().then(function(arts) {
                    res.locals.arts = arts;
                    res.render('admin');
                });
            } else {
                res.render('login', {
                    error: 'Invalid username and password combination'
                });
            }
        });
});

router.post('/upload', function(req, res, next) {
    // TODO: Add image upload functionality
    var filename = req.body.filename;
    res.redirect('https://http.cat/200');
});

module.exports = router;

// ================
// Helper Functions
// ================

function getArts() {
    return new Promise(function(resolve, reject) {
        client.query("SELECT * FROM arts", function(err, data) {
            var arts = [];
            for (var i = 0; i < data.rows.length; i++) {
                arts.push(data.rows[i]);
            }
            resolve(arts);
        });
    });
}
