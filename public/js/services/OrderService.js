angular.module('OrderService', []).factory('Order', ['$http', function($http) {

    return {
        // get details for specific order ID
        get : function(orderId) {
            return $http.get('/api/order/' + orderId);
        },

        //get all orders
        getAll : function() {
            return $http.get('/api/orders');
        },

        //get order history for user
        getHistory : function(username) {
            return $http.get('/api/order/history/' + username);
        },

        // create new order
        create : function(orderDetails) {
            return $http.post('/api/order', orderDetails);
        },

        // update order
        update : function(orderDetails) {
            return $http.put('/api/order', orderDetails);
        },

        // delete order
        delete : function(orderId) {
            return $http.delete('/api/order/' + orderId);
        }
    }

}]);