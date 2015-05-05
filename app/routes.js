var Product = require('./models/product');
var Order = require('./models/order');
var User = require('./models/user');

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
        console.log("Order post API route");

        var newOrder = new Order(req.body);
        console.log(newOrder);

        newOrder.save(function(err) {
            if (err) {
                console.log('Order error: ' + err);
                res.send(err);
            } else {
                console.log('Order saved successfully!');
            }
            res.json(newOrder._id);
        });

    });

    // USER

    // POST create user
    app.post('/api/user', function(req, res) {

        var newUser = new User(req.body);

        newUser.save(function(err) {
            if (err){
                throw err;
            }else{
                console.log('User saved successfully!');
            }
        });

        return res.send(newUser);
    });

    // GET user by username
    app.get('/api/user/:username', function(req, res) {
        console.log("find");
        User.find({ 'username': req.params.username }, function(err, user) {
            if (err)
                res.send(err);

            console.log(user);
            res.json(user);

        });
    });

    app.post('/api/login', function(req, res) {
        console.log("login");


    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};