angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'SplashController'
        })

        .when('/catalogue', {
            templateUrl: 'views/order/catalogue.html',
            controller: 'CatalogueController'
        })

        .when ('/catalogue/:categoryId', {
            templateUrl: 'views/order/catalogue.html',
            controller: 'CatalogueController'
        })

        .when('/about', {
            templateUrl: 'views/underconstruction.html',
            controller: 'MainController'
        })

        .when('/blog', {
            templateUrl: 'views/blog.html',
            controller: 'MainController'
        })

        .when('/orders', {
            templateUrl: 'views/order/orders.html',
            controller: 'OrderController'
        })

        .when('/orders/:orderId', {
            templateUrl: 'views/order/orders.html',
            controller: 'OrderController'
        })

        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })

        .when('/cart', {
            templateUrl: 'views/order/cart.html',
            controller: 'OrderController'
        })

        .when('/register', {
            templateUrl: 'views/account/registration.html',
            controller: 'UserController'
        })

        .when('/account', {
            templateUrl: 'views/account/profile.html',
            controller: 'UserController'
        })
        .when('/user/:username', {
            templateUrl: 'views/account/profile.html',
            controller: 'UserController'
        })
        .when('/profile', {
            templateUrl: 'views/account/profile.html',
            controller: 'UserController'
        })
        .when('/user/:username', {
            templateUrl: 'views/account/profile.html',
            controller: 'UserController'
        })

        .when('/signin', {
            templateUrl: 'views/account/login.html',
            controller: 'UserController'
        });


    $locationProvider.html5Mode(true);

}]);
