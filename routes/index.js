var express = require('express');
var router = express.Router();
var fs = require('fs');
var pg = require('pg');
var client = new pg.Client('postgres://localhost:5432/lynonsart');
client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    getImages().then(function(images) {
        images.sort(function(a, b) {
            return b.upload_date - a.upload_date;
        });
        if (!images.length) {
            res.render('index');
        } else {
            var categories = [];
            for (var i = 0; i < images.length; i++) {
                if (categories.indexOf(images[i].category_name) === -1) {
                    categories.push(images[i].category_name);
                }
            }
            res.render('index', {
                latestUrl: images[0].url.split(' ').join('%20'),
                images: JSON.stringify(images),
                categories: categories
            });
        }
    });
});

module.exports = router;

function getImages() {
    return new Promise(function(resolve, reject) {
        client.query("SELECT * FROM arts INNER JOIN categories ON categories.id = category_id", function(err, data) {
            var images = [];
            for (var i = 0; i < data.rows.length; i++) {
                images.push(data.rows[i]);
            }
            resolve(images);
        });
    });
}
