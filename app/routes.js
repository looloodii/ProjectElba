// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');
var Product = require('./models/product');
var User = require('./models/user');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // sample api route
    app.get('/api/nerds', function(req, res) {
        // use mongoose to get all nerds in the database
        Nerd.find(function(err, nerds) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(nerds); // return all nerds in JSON format
        });
    });

    // CATALOGUE

    // GET api/catalogue/:category
    app.get('/api/catalogue/:category', function(req, res) {

        Product.find({ 'category': req.params.category }, function(err, products) {
            if (err)
                res.send(err);

            res.json(products); // return all nerds in JSON format
        });
    });

    // USER

    /*// POST api/user/create
    app.post('/api/user/create', function(req, res) {
        console.log("inside");
       /!* User.create({ 'user': req.params.user }, function(err, users) {
            if (err)
                res.send(err);

            res.json(users); // return all nerds in JSON format
        });*!/
        console.log("on app create user");
    });*/

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};