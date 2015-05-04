// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');
var Product = require('./models/product');
//var User = require('./models/user');

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

            res.json(products);
        });
    });

    // USER

    // POST api/user/
    app.post('/api/user', function(req, res) {

        var User = require('./models/user');

        var newUser = new User({
            username : req.body.form.username,
            firstName:  req.body.form.firstName,
            lastName: req.body.form.lastName,
            password: req.body.form.password,
            email: req.body.form.email,
            mobileNumber: req.body.form.mobileNumber,
            location: req.body.form.location

        });

        newUser.save(function(err) {
            if (err){
                throw err;
            }else{
                console.log('User saved successfully!');
            }
        });

        return res.send(newUser);
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};