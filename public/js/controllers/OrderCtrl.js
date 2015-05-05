cart = angular.module('OrderCtrl', []);

cart.controller('OrderController', function($scope, ngCart, Order) {

    //Event Date Picker

    var getCurrentDate = function() {
        return new Date();
    };

    $scope.initDate = function() {
        $scope.orderdate = getCurrentDate().setDate(getCurrentDate().getDate() + 2);
    };

    $scope.initDate();

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
    $scope.createOrder = function() {
        $scope.submitted = false;
        if ($scope.orderform.$valid) {
            // Submit as normal
        } else {
            $scope.orderform.submitted = true;
        }
    }

});