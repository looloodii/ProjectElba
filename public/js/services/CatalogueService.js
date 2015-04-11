angular.module('CatalogueService', []).factory('Product', ['$http', function($http) {

    return {
        // call to get products by category
        get: function (category) {
            //return [];
            return $http.get('/api/catalogue/' + category);
        }
    };

}]);
