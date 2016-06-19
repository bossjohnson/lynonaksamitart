var express = require('express');
var router = express.Router();
var pg = require('pg');
var bcrypt = require('bcrypt');
var client = new pg.Client('postgres://localhost:5432/lynonsart');
var fs = require('fs');
var aws = require('aws-sdk');
// require('dotenv').config();
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

router.get('/sign-s3', function(req, res, next) {
    var s3 = new aws.S3();
    var fileName = req.query.fileName;
    var fileType = req.query.fileType;
    var s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.error(err);
            return res.end();
        }
        var returnData = {
            signedRequest: data,
            url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

router.post('/upload', function(req, res, next) {
    // TODO: Add images to database after successful upload
    var title = req.query.title;
    var url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${req.query.filename}`;
    var category = req.query.category;
    insertIntoArts(title, url, category);
    res.end();
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

function insertIntoArts(title, url, category) {
    return new Promise(function(resolve, reject) {
        var queryString =
            `INSERT INTO arts (title, url, category_id)
                VALUES ('${title}', '${url}', '${category}')
            `;
        client.query(queryString, function(err, data) {
            if (err) {
                console.log('error:', err);
                reject(err);
            } else {
                resolve('INSERT');
            }
        });
    });
}
