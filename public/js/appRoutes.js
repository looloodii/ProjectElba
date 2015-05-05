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

        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'MainController'
        })

        .when('/cart', {
            templateUrl: 'views/order/cart.html',
            controller: 'OrderController'
        })

        /*.when('/register', {
            templateUrl: '/registration',
            controller: 'UserController'
        });

        .when('/account', {
            templateUrl: 'views/profile.html',
            controller: 'UserController'
        })

        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'UserController'
        });*/


    $locationProvider.html5Mode(true);

}]);
