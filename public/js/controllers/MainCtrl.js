angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location, ngCart) {

    $scope.tagline = 'To the moon and back!';
    $scope.user = {};

    $scope.register = function() {
       $location.path('/register', $scope);
    };

    $scope.getTotalItems = function() {
        return ngCart.getTotalItems();
    };

});
