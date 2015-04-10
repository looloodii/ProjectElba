angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd) {

    Nerd.get().success(function(data) {
        $scope.nerds = data;
    });

});
