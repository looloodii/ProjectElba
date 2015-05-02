angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to get products by category
        create: function (req) {
            /*//return [];
            console.log("user service");
            console.log(req);
            var aa = new User(req);
            aa.username = "sample";
            //var product = new Product(req.body);
            aa.save(function(err, result){
               res.json(result);
            });*/

            return $http.post('api/user/create');
        }
    };

}]);
