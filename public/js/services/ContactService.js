angular.module('ContactService', []).factory('Inquiry', ['$http', function($http) {

    return {

        // post new inquiry
        create : function(inquiry) {
            return $http.post('/api/inquire', inquiry);
        }
    }

}]);

