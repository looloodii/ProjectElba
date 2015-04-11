angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/catalogue', {
            templateUrl: 'views/catalogue.html',
            controller: 'CatalogueController'
        })

        .when('/about', {
            templateUrl: 'views/underconstruction.html',
            controller: 'MainController'
        })

        .when('/custom', {
            templateUrl: 'views/underconstruction.html',
            controller: 'MainController'
        })

        .when('/blog', {
            templateUrl: 'views/blog.html',
            controller: 'MainController'
        })

        .when('/contact', {
            templateUrl: 'views/underconstruction.html',
            controller: 'MainController'
        })
        ;

    $locationProvider.html5Mode(true);

}]);
