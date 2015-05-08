cart = angular.module('OrderCtrl', []);

cart.service('orderDtl', function ($filter) {

    var items = [],
        status = '',
        pickupDate = new Date(),
        editable = false,
        id = '';

    this.initOrder = function (order, isAdmin) {
        id = order._id;
        items = order.itemList;
        status = order.status;
        pickupDate = $filter('date')(order.pickupDate, 'yyyy-MM-dd');
        if (isAdmin) {
            editable = true;
        } else {
            editable = this.canEdit();
        }

    };

    this.id = function () {
        return id;
    }

    this.editable = function () {
        return editable;
    };

    this.uniqueItemCount = function () {
        return items.length;
    };

    this.setItems = function (items) {
        items = items;
    };

    this.getItems = function () {
        return items;
    };

    this.pickupDate = function () {
        return pickupDate;
    };

    this.status = function () {
        return status;
    };

    this.canEdit = function () {
        var lastDate = new Date().setDate(new Date().getDate() + 2);
        var lastEditDate = $filter('date')(lastDate, 'yyyy-MM-dd');

        if (pickupDate < lastEditDate) {
            return false;
        }

        if (status == 'NEW' || status == 'INPROCESS') {
            return true;
        }
    };

    this.removeItemById = function (itemId) {
        if (this.uniqueItemCount() > 1 && editable) {
            angular.forEach(items, function (item, index) {
                if (item._id === itemId) {
                    items.splice(index, 1);
                }
            });
        }
    };

    this.updateQuantity = function (itemId, num) {
        angular.forEach(items, function (item) {
            if (item._id === itemId) {
                if ((item.quantity === 1 && num === -1) || !editable) {
                    // do nothing
                } else {
                    item.quantity += num;
                    item.totalprice = item.price * item.quantity;
                }
            }
        });
    };

    this.totalPrice = function () {
        var total = 0;
        angular.forEach(items, function (item) {
            total += item.totalprice;
        });
        return +parseFloat(total).toFixed(2);
    };

});

cart.service('orderBuilder', function () {

    this.buildItemList = function (ngCartItems) {
        var itemList = [];
        angular.forEach(ngCartItems, function (item) {
            itemList.push({
                'name': item._id,
                'quantity': item._quantity,
                'price': item._price,
                'totalprice': item.getTotal()
            })
        });
        return itemList;
    };

    this.buildNewOrder = function (orderform, ngCart) {
        var newOrder = {
            'userName': orderform.username,
            'contactName': orderform.contactname,
            'contactPhone': orderform.contactphone,
            'contactEmail': orderform.contactemail,
            'pickupDate': orderform.orderdate,
            'pickupLocation': orderform.pickuppoint,
            'instructions': orderform.instructions,
            'created': new Date(),
            'status': 'NEW',
            'totalPrice': ngCart.getSubTotal(),
            'itemList': this.buildItemList(ngCart.getItems())
        };
        return newOrder;
    }
});

cart.service('user', ['$window', function ($window) {

    var loggedIn = false;
    var user = {};

    this.init = function () {
        console.log($window.localStorage.getItem('user'));
        if ($window.localStorage.getItem('user') != null) {
            loggedIn = true;
            user = angular.fromJson($window.localStorage['user']);
            user.name = this.contactName();
            return true;
        }
        return false;
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

    this.phone = function() {
        if (loggedIn) {
            return user.mobileNumber;
        }
    }

    this.admin = function() {
        console.log("user role: " + user.role);
        if (loggedIn) {
            return user.role == 'ADMIN';
        }
        return false;
    }

}]);

cart.controller('OrderController', function ($scope, $location, $routeParams, $filter, ngCart, orderDtl, orderBuilder, user, Order) {

    //Event Date Picker
    var getCurrentDate = function () {
        return new Date();
    };

    $scope.initDate = function () {
        $scope.orderdate = getCurrentDate().setDate(getCurrentDate().getDate() + 2);
    };

    $scope.minDate = getCurrentDate().setDate(getCurrentDate().getDate() + 2);
    $scope.maxDate = getCurrentDate().setDate(getCurrentDate().getDate() + 90);

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.dateFormat = 'dd-MMMM-yyyy';
    $scope.pickupPoints = ['Shadow Cove Apartments', 'Sunnyvale'];
    $scope.statusOpt = ['NEW', 'INPROCESS', 'COMPLETED'];
    $scope.emptyOrder = {};

    //Initialize User Details
    function initializeUser() {
        user.init();
        if (user.loggedIn()) {
            $scope.neworder = {};
            $scope.neworder.username = user.userName();
            $scope.neworder.contactname = user.contactName();
            $scope.neworder.contactemail = user.email();
            $scope.neworder.contactphone = user.phone();
            getHistory();
        }
    }

    initializeUser();

    $scope.userLoggedIn = function () {
        return user.loggedIn();
    }

    $scope.userAdmin = function () {
        return user.admin();
    }

    //Initialize user's order history
    function getHistory() {
        if (user.admin()) {
            getAllOrders();
        } else {
            getUserHistory();
        }
        $scope.pageNum = 1;
    }

    function getUserHistory() {
        Order.getHistory(user.userName()).success(function (data) {
            $scope.history = data;
            $scope.totalOrders = data.length;
        });
        $scope.sortByStatus = ['-status', 'pickupDate', 'created'];
        $scope.sortByCreated = ['created', '-status', 'pickupDate'];
        $scope.sortByPickupDate = ['pickupDate', '-status', 'created'];
        $scope.sortType = $scope.sortByStatus;
        $scope.isCollapsed = true;
    }

    function getAllOrders() {
        Order.getAll().success(function (data) {
            $scope.history = data;
            $scope.totalOrders = data.length;
        });
        $scope.sortByStatus = ['-status', 'pickupDate', 'created'];
        $scope.sortByCreated = ['created', '-status', 'pickupDate'];
        $scope.sortByPickupDate = ['pickupDate', '-status', 'created'];
        $scope.sortType = $scope.sortByStatus;
        $scope.isCollapsed = true;
    }

    $scope.resetCart = function () {
        $scope.order = angular.copy($scope.emptyOrder);
        ngCart.empty();
    };

    $scope.createOrder = function () {
        var orderDetails = orderBuilder.buildNewOrder($scope.neworder, ngCart);
        Order.create(orderDetails)
            .success(function (data) {
                if (data.error) {
                    $scope.newOrderError = data.errMsg;
                } else {
                    $scope.resetCart();
                    $location.path('/orders/' + data.orderId);
                    $scope.mailMsg = data.mailMsg;
                }
            });
    }

    $scope.isCartEmpty = function () {
        if (ngCart.getTotalItems() > 0) {
            return false;
        }
        return true;
    }

    if ($routeParams.orderId) {
        Order.get($routeParams.orderId).success(function (data) {
            updateOrderDetails(data[0]);
        });
    }

    $scope.updateOrder = function (orderDetails) {
        orderDetails.itemList = orderDtl.getItems();
        orderDetails.totalPrice = orderDtl.totalPrice();
        Order.update(orderDetails)
            .success(function (data) {
                $scope.mailMsg = data.mailMsg;
                if (data.error) {
                    $scope.updateOrderError = data.errMsg;
                } else {
                    $scope.updateOrderSuccess = 'Successfully updated.';
                    console.log(data);
                    updateOrderDetails(data);
                }
            });
    }

    $scope.cancelOrder = function () {
        Order.delete(orderDtl.id())
            .success(function (data) {
                $scope.mailMsg = data.mailMsg;
                if (data.error) {
                    $scope.updateOrderError = data.errMsg;
                } else {
                    $scope.updateOrderSuccess = 'Successfully cancelled.';
                    updateOrderDetails(data);
                }
            });
    }

    function updateOrderDetails(orderData) {
        orderDtl.initOrder(orderData, user.admin());
        $scope.order = orderDtl;
        $scope.order.orderDetails = orderData;
    }

});