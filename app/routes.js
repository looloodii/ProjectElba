var Product = require('./models/product');
var Order = require('./models/order');
//var User = require('./models/user');

module.exports = function(app) {

    // CATALOGUE

    // GET api/catalogue/:category
    app.get('/api/catalogue/:category', function(req, res) {

        Product.find({ 'category': req.params.category }, function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });

    // CART/ORDER

    // GET by orderId
    app.get('/api/order/:id', function(req, res) {

        Order.find({ 'orderId': req.params.orderId }, function(err, order) {
            if (err)
                res.send(err);

            res.json(order);
        });
    });

    app.post('/api/order', function(req, res) {

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