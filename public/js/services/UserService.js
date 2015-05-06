angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        /*// create user
        create: function (req) {
            return $http.post('/api/user', {form: req}).success(function(data, status, headers, config){
                //handle success

            }).error(function(data, status, headers, config){
                //handle error
            });
        },*/

        get : function(userID) {
            console.log("User get service.");
            return $http.post('/api/user/' + userID);
        },
        verify : function(param) {
            console.log("User verify service.");
            return $http.post('/api/verifyuser', param);
        },

        // create new user
        create : function(userDetails) {
            console.log("User create service.");
            return $http.post('/api/user', userDetails);
        },

        login : function(userDetails) {
            console.log("User login service.");
            return $http.post('/api/login', userDetails);
        }


    };

}]);
