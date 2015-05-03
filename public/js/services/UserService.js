angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get products by category
        create: function (req) {
            return $http.post('/api/user', {form: req}).success(function(data, status, headers, config){
                //handle success

            }).error(function(data, status, headers, config){
                //handle error
            });
        }
    };

}]);
