cart = angular.module('OrderCtrl', []);

cart.controller('OrderController', function($scope, $location, $routeParams, ngCart, Order) {

    //Event Date Picker

    var getCurrentDate = function() {
        return new Date();
    };

    $scope.initDate = function() {
        $scope.orderdate = getCurrentDate().setDate(getCurrentDate().getDate() + 2);
    };

    //$scope.initDate();

    $scope.clear = function () {
        $scope.orderdate = null;
    };

    $scope.minDate = getCurrentDate().setDate(getCurrentDate().getDate() + 2);
    $scope.maxDate = getCurrentDate().setDate(getCurrentDate().getDate() + 90);

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.dateFormat = 'dd-MMMM-yyyy';

    //Logged in user details
    $scope.loggedIn = function(){
        //if user is logged in return true
        return false;
    }

    $scope.pickupPoints = ['Shadow Cove Apartments', 'Sunnyvale'];

    //Submit Order
    $scope.emptyOrder = {};

    $scope.resetCart = function() {
        $scope.order = angular.copy($scope.emptyOrder);
        $scope.orderform.submitted = false;
        ngCart.empty();
    };

    $scope.createOrder = function() {
        $scope.orderform.submitted = false;
        console.log('totalItems: ' + ngCart.getTotalItems());

        if ($scope.orderform.$valid) {
            // Submit as normal
            var itemDetails = [];
            angular.forEach(ngCart.getItems(), function(item) {
                itemDetails.push({
                    'name' : item._id,
                    'quantity' : item._quantity,
                    'price' : item._price,
                    'totalprice' : item.getTotal()
                })
            });

            var orderDetails = {
                'contactName' : $scope.order.contactname,
                'contactPhone' : $scope.order.contactphone,
                'contactEmail' : $scope.order.contactemail,
                'pickupDate' : $scope.order.orderdate,
                'pickupLocation' : $scope.order.pickuppoint,
                'instructions' : $scope.order.instructions,
                'created' : getCurrentDate(),
                'status' : 'NEW',
                'totalPrice' : ngCart.getSubTotal(),
                'itemList' : itemDetails
            }

            Order.create(orderDetails)
                .success(function (data) {
                    if (data.error) {
                        $scope.newOrderError = data.errMsg;
                    } else {
                        $scope.resetCart();
                        //$scope.$broadcast('createdOrderId', data.orderId);
                        $location.path('/orders/' + data.orderId);
                    }
                });

        } else {
            $scope.orderform.submitted = true;
            console.log('Invalid form.');
            console.log($scope.orderform.$error);
            console.log($scope.orderdate);
        }
    }

    $scope.isCartEmpty = function () {
        if (ngCart.getTotalItems() > 0) {
            return false;
        }
        return true;
    }

    if ($routeParams.orderId) {
        Order.get($routeParams.orderId).success(function(data) {
            $scope.order = data[0];
        });
    }

});