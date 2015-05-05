var Product = require('./models/product');
var Order = require('./models/order');
var User = require('./models/user');

module.exports = function(app, passport) {

    //login
    app.get('/login', function(req, res) {
       // res.render('login.ejs', { message: req.flash('loginMessage') });
        res.sendfile('./public/views/login.html');
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.get('/signup', function(req, res) {
       // res.render('registration.ejs', { message: req.flash('signupMessage') });
        res.sendfile('./public/views/registration.html', { message: req.flash('signupMessage') });
    });
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.get('/profile', isLoggedIn, function(req, res) {
      /*  res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });*/
        res.sendfile('./public/views/profile.html', { message: req.flash('signupMessage') });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect
        res.redirect('/signup');
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