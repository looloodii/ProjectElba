angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location, ngCart) {

    $scope.tagline = 'To the moon and back!';


    $scope.register = function() {
        console.log($scope.regEmail);
       $location.path('/register').search({regEmail: $scope.regEmail});

    };

    $scope.getTotalItems = function() {
        return ngCart.getTotalItems();
    };

});
