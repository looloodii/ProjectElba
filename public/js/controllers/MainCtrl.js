angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location) {

    $scope.tagline = 'To the moon and back!';
    $scope.regForm = {};

    $scope.register = function() {
       // $http.get('/register', $scope).
        //    success(function(data) {
                $location.path('/register', $scope);
         //   });
    }

});
