angular.module('OrderService', []).factory('Order', ['$http', function($http) {

    return {
        // get details for specific order ID
        get : function(orderId) {
            return $http.get('/api/order/' + orderId);
        },

        // create new order
        create : function(orderDetails) {
            return $http.post('/api/order', orderDetails);
        },

        // delete order
        delete : function(id) {
            return $http.delete('/api/order/' + id);
        }
    }

}]);

