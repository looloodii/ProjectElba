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
            return $http.post('/api/user/' + userID);
        },
        verify : function(param) {
            return $http.post('/api/verifyuser', param);
        },

        // create new user
        create : function(userDetails) {
            return $http.post('/api/user', userDetails);
        },

        login : function(userDetails) {
            return $http.post('/api/login', userDetails);
        },

        update : function(userDetails) {
            return $http.put('/api/user', userDetails);
        },

        logout : function() {
            return $http.get('/api/logout');
        },

        updatePassword : function(passwordDetails) {
            return $http.put('/api/password', passwordDetails);
        }

    };

}]);
