angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'SplashController'
        })

        .when('/catalogue', {
            templateUrl: 'views/catalogue.html',
            controller: 'CatalogueController'
        })

        .when ('/catalogue/:categoryId', {
            templateUrl: 'views/catalogue.html',
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

        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'MainController'
        })

        .when('/cart', {
            templateUrl: 'views/cart.html',
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
