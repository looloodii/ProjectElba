var Product = require('./models/product');
var Order = require('./models/order');
var User = require('./models/user');
var mailer = require('./mailer');

module.exports = function (app, passport) {

    //login
    app.get('/login', function (req, res) {
        res.redirect('/signin');
    });
    app.post('/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/user/' + user.local.username);
            });
        })(req, res, next);
    });

    app.get('/signup', function (req, res) {
        res.redirect('/register');
    });

    app.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.redirect('/register');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                var response = {};
                mailer.mailUserDetails(user, function (err) {
                    if (err) {
                        response = {error: true, errMsg: err};
                    } else {
                        response = {successMsg: 'Details have been sent to the email you provided.'};
                    }
                });
                // res.json(response);

                return res.redirect('/user/' + user.local.username);
            });
        })(req, res, next);
    });

    var sess;

    /*app.get('/logout', function (req, res) {
        //$window.localStorage.removeItem('user');
        req.session.destroy(function (err) {
            res.redirect('/login');
        });
    });*/

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    };


    // CATALOGUE

    // GET api/catalogue/:category
    app.get('/api/catalogue/:category', function (req, res) {
        Product.find({'category': req.params.category}, function (err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });

    // GET all products
    app.get('/api/catalogue', function (req, res) {
        Product.find({}, function (err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });

    app.post('/api/catalogue', function (req, res) {
        var newProduct = new Product(req.body);

        newProduct.save(function (err) {
            var response = {};
            if (err) {
                console.log('Product save error: ' + err);
                response = {error: true, errMsg: err};
            } else {
                console.log('Product created successfully! ' + newProduct._id);
                response = {orderId: newProduct._id, mailMsg: ''};
            }
            res.json(response);
        });
    });

    app.put('/api/catalogue', function (req, res) {
        var product = req.body;
        product.updated = new Date();

        var response = {};
        Product.findByIdAndUpdate(
            req.body._id,
            {$set: req.body},
            {new: true},
            function (err, order) {
                if (err) {
                    console.log('Product update error: ' + err.toJson);
                    response = {error: true, errMsg: err};
                } else {
                    response = order;
                }
                res.json(response);
            });
    });

    app.put('/api/catalogue/status/:id', function (req, res) {
        var product = req.body;
        product.updated = new Date();

        var response = {};
        Product.findByIdAndUpdate(
            req.params.id,
            {$set: { 'status' : req.body }},
            {new: true},
            function (err, order) {
                if (err) {
                    console.log('Product update error: ' + err.toJson);
                    response = {error: true, errMsg: err};
                } else {
                    response = order;
                }
                res.json(response);
            });
    });

    /*****
     ***** CART/ORDER DETAILS
     *****/

    // GET by orderId
    app.get('/api/order/:id', function (req, res) {
        Order.find({'_id': req.params.id}, function (err, order) {
            if (err)
                res.send(err);
            res.json(order);
        });
    });

    //GET ALL
    app.get('/api/orders', function (req, res) {
        Order.find({}, function (err, orders) {
            if (err)
                res.send(err);
            res.json(orders);
        });
    });

   //GET history
     app.get('/api/order/history/:username', function (req, res) {
        Order.find({'userName': req.params.username}, function (err, orders) {
        if (err)
            res.send(err);
            res.json(orders);
        });
     });


    app.post('/api/order', function (req, res) {
        var newOrder = new Order(req.body);

        newOrder.save(function (err) {
            var response = {};
            if (err) {
                console.log('Order save error: ' + err);
                response = {error: true, errMsg: err};
            } else {
                console.log('Order created successfully! ' + newOrder._id);
                response = {orderId: newOrder._id, mailMsg: ''};

                // Send email to customer
                mailer.mailOrderDetails(newOrder, function (err) {
                    if (err) {
                        response.mailMsg = 'We could not send you an email with your order details at this time. ' +
                        'Please save the order confirmation number for your records.';
                    } else {
                        response.mailMsg = 'Details have been sent to the email you provided.';
                    }
                });
            }

            res.json(response);
        });
    });

    app.put('/api/order', function (req, res) {
        var order = req.body;
        order.updated = new Date();

        var response = {};
        Order.findByIdAndUpdate(
            req.body._id,
            {$set: req.body},
            {new: true},
            function (err, order) {
                if (err) {
                    console.log('Order update error: ' + err.toJson);
                    response = {error: true, errMsg: err};
                } else {
                    response = order;

                    // Send email to customer
                    mailer.mailOrderUpdates(order, function (err) {
                        if (err) {
                            response.mailMsg = 'We could not send you an email with your order details at this time. ' +
                            'Please save the order confirmation number for your records.';
                        } else {
                            response.mailMsg = 'Updated order details have been sent to the email you provided.';
                        }
                    });
                }
                res.json(response);
            });
    });

    app.delete('/api/order/:id', function (req, res) {
        Order.findByIdAndUpdate(
            {'_id': req.params.id},
            {$set: {status: 'CANCELLED', updated: new Date()}},
            {new: true},
            function (err, order) {
                var response = {};
                if (err) {
                    console.log('Order cancel error: ' + err);
                    response = {error: true, errMsg: err};
                } else {
                    response = order;

                    // Send email to customer
                    mailer.mailOrderCancel(order, function (err) {
                        if (err) {
                            response.mailMsg = 'We could not send you an email with your order details at this time. ' +
                            'Please save the order confirmation number for your records.';
                        } else {
                            response.mailMsg = 'Details have been sent to the email you provided.';
                        }
                    });
                }
                res.json(response);
            });
    });

    // USER

    // POST create user
    app.post('/api/user', function (req, res) {

        var newUser = new User(req.body);

        newUser.save(function (err) {
            if (err) {
                throw err;
            } else {
                console.log('User saved successfully!');
            }
        });

        return res.send(newUser);
    });

    // GET user by username
    app.post('/api/user/:username', isLoggedIn, function (req, res) {
        sess = req.session;
        sess.user = req.user;
        var username = sess.user.local.username;
        User.findOne({'local.username': username}, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
    app.post('/api/check/:username', function (req, res) {
        User.findOne({'local.username': req.params.username}, function (err, user) {
            console.log(user);
            if (err)
                res.send(err);
            res.json(user);
        });
    });
    app.put('/api/user', function (req, res) {
        var updatedUser = new User(req.body);
        var query = {'local.username': updatedUser.local.username};
        User.update(query, req.body, {}, function (err, user) {
            if (err) {
                throw err;
            }
            return res.send("Succesfully saved!");
        });
    });

    app.post('/api/verifyuser', function (req, res) {
        sess = req.session;
        sess.user = req.user;
        if (sess.user != undefined && sess.user != null) {
            res.json(sess.user);
        } else {
            res.json(null);
        }

    });

    app.get('/api/logout', function (req, res) {
        req.logout();
        res.send("");
    });

    app.post('/api/login', function (req, res) {
        console.log("login");
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

    //CONTACT FORM
    app.post('/api/inquire', function (req, res) {
        var response = {};
        mailer.mailInquiry(req.body, function (err) {
            if (err) {
                response = {error: true, errMsg: err};
            } else {
                response = {successMsg: 'Details have been sent to the email you provided.'};
            }
        });
        res.json(response);
    });

};