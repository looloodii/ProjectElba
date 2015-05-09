catalogue = angular.module('CatalogueCtrl', []);

catalogue.service('user', ['$window', function ($window) {

    var loggedIn;
    var user;

    this.init = function () {
        //console.log($window.localStorage.getItem('user'));
        if ($window.localStorage.getItem('user') != null) {
            loggedIn = true;
            user = angular.fromJson($window.localStorage['user']);
            user.name = this.contactName();
        } else {
            loggedIn = false;
            user = {};
        }
    };

    this.loggedIn = function () {
        return loggedIn;
    };

    this.userDetails = function () {
        return user;
    };

    this.userName = function () {
        if (loggedIn) {
            return user.local.username;
        }
    };

    this.contactName = function () {
        if (loggedIn) {
            return user.firstName + ' ' + user.lastName;
        }
    };

    this.email = function () {
        if (loggedIn) {
            return user.email;
        }
    };

    this.phone = function () {
        if (loggedIn) {
            return user.mobileNumber;
        }
    }

    this.admin = function () {
        //console.log("user role: " + user.role);
        if (loggedIn) {
            return user.role == 'ADMIN';
        }
        return false;
    }

}]);

catalogue.controller('CatalogueController', function ($scope, $http, ngCart, Product, user, $timeout) {

    user.init();
    $scope.userAdmin = user.admin();

    if (user.admin()) {
        getAllProducts();
    } else {
        getProductsPerCategory();
    }

    function getAllProducts() {
        Product.getAll().success(function (data) {
            //console.log(data);
            $scope.catalogue = chunk(data, 3);
        });
    };

    $scope.categoryOpt = ['CAKES','CUPCAKES','MACARONS','TREATS'];

    function getProductsPerCategory() {
        Product.get('CAKES').success(function (data) {
            //$scope.cakes = data;
            //[[c1,c2,c3], [c4,c5,c6]]
            $scope.cakes = chunk(data, 3);
        });

        Product.get('CUPCAKES').success(function (data) {
            $scope.cupcakes = chunk(data, 3);
        });

        Product.get('MACARONS').success(function (data) {
            $scope.macarons = chunk(data, 3);
        });

        Product.get('TREATS').success(function (data) {
            $scope.treats = chunk(data, 3);
        });
    };

    $scope.updateProduct = function (product, index) {
        //console.log('index: ' +index);
        Product.update(product).success(function (data) {
            product.successAlert = "Updated";

            $timeout(function () {
                product.successAlert = null;
            }, 2000);
        })
    };

    $scope.newproduct = {};
    $scope.addProduct = function (newproduct) {
        console.log('newproduct: ' + angular.toJson(newproduct));
        Product.create(newproduct).success(function(data) {
            if (data.error) {
                $scope.newproduct.successAlert = data.errMsg;
            } else {
                //console.log(data);
                $scope.newproduct.successAlert = 'Successfully updated.';
                $scope.catalogue.push(data);
                $timeout(function () {
                    $scope.newproduct.successAlert = null;
                }, 2000);
            }
        })
    };


    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

});

