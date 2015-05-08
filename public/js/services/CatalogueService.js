angular.module('CatalogueService', []).factory('Product', ['$http', function($http) {

    return {
        // call to get products by category
        get: function (category) {
            return $http.get('/api/catalogue/' + category);
        },

        // get all products
        get: function () {
            return $http.get('/api/catalogue');
        },

        // add product
        create: function (product) {
            return $http.post('/api/catalogue', product);
        },

        // update product
        update: function (product) {
            return $http.put('/api/catalogue', product);
        },

        // update status
        updateStatus: function (id, status) {
            return $http.put('/api/catalogue/' + id + '/' + status);
        }
    };

}]);
