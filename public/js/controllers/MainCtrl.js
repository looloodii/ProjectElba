angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location, ngCart) {

    $scope.tagline = 'To the moon and back!';

    $scope.register = function() {
        //$http.get("/register", {regemail: $scope.regemail});
        $location.path('/register').search({regemail: $scope.regemail});

    };

    $scope.getTotalItems = function() {
        return ngCart.getTotalItems();
    };

});
