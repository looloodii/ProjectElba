var Product = require('./models/product');
var Order = require('./models/order');
var User = require('./models/user');
var mailer = require('./mailer');

module.exports = function(app, passport) {

    //login
    app.get('/login', function(req, res) {
        res.redirect('/signin');
    });
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/user/' + user.local.username);
            });
        })(req, res, next);
    });

    app.get('/signup', function(req, res) {
        res.redirect('/register');
    });

    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/signup'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/user/' + user.local.username);
            });
        })(req, res, next);
    });

    var sess;

    app.get('/logout', function(req, res) {
        req.session.destroy(function (err) {
            res.redirect('/login'); //Inside a callback… bulletproof!
        });
    });

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect
        res.redirect('/');
    };



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
        Order.find({ '_id': req.params.id }, function(err, order) {
            if (err)
                res.send(err);

            res.json(order);
        });
    });

    app.post('/api/order', function(req, res) {
        var newOrder = new Order(req.body);
        //console.log(newOrder);

        // Save order in DB
        newOrder.save(function(err) {
            var response = {};
            if (err) {
                console.log('Order error: ' + err);
                response = { error : true, errMsg: err };
            } else {
                console.log('Order saved successfully!');
                response = { orderId : newOrder._id };

                // Send email to customer
                mailer.mailOrderDetails(newOrder);
            }

            res.json(response);
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
    app.post('/api/user/:username', isLoggedIn, function(req, res) {
        User.findOne({ 'local.username': req.params.username }, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

    app.post('/api/verifyuser', function(req, res) {
        sess = req.session;
        sess.user = req.user;
        if(sess.user != undefined && sess.user != null){
            res.json(sess.user);
        }else{
            res.json(null);
        }

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