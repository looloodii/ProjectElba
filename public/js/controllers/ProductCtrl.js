angular.module('ProductCtrl', []).controller('ProductController', function($scope, Product) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    Product.get().success(function(data) {
        $scope.nerds = data;
    });

});
