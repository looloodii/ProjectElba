app.controller('productsController',['$scope', '$resource',
    function ($scope, $resource){

        var Product = $resource('/api/products');

        Product.query(function(result){
            $scope.products = result;
        });


        $scope.createProduct = function() {
            var product = new Product();
            product.name = $scope.productName;
            product.$save(function (result){
                $scope.products.push(result);
                $scope.productName = '';
            });
        }
}]);
