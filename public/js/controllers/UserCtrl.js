usermod = angular.module('UserCtrl', []);

usermod.controller('UserController', function($window, $scope, User, $route, $location) {
/*
angular.module('UserCtrl', []).controller('UserController', function($scope, User, $route, $location) {
*/

    $scope.tagline = 'Sign Up Now!';

    $scope.regEmail =  $route.current.params.regEmail;
    var username = $route.current.params.username;
    var loc = $location.path();

    if(loc == "/account"){
        var obj = {};
        User.verify(obj).success(function (data) {
            if(data!=null){
                $scope.user = data;
                $window.localStorage['user'] = angular.toJson(data);
            }
            else{
                $location.path('/signin');
            }
        }).error(function (data) {
            console.log("error");
        });

    }

    if(username!=null) {
        User.get(username).success(function (data) {
            $scope.user = data;
            if ($scope.user.local == undefined) {
                $location.path('/signin');
            }
        });
    }
    $scope.login = function(){
        var userDetails = {
            'username' : $scope.login.username,
            'password' : $scope.login.password
        };

        User.login(userDetails)
            .success(function (data) {
                $scope.loggedIn() == true;
            });
    };

    /*$scope.createUser = function() {
            var userDetails = {
                'username' : $scope.user.username,
                'firstName':  $scope.user.firstName,
                'lastName': $scope.user.lastName,
                'password': $scope.user.password,
                'email': $scope.user.email,
                'mobileNumber': $scope.user.mobileNumber,
                'location': $scope.user.location
            };

            User.create(userDetails)
                .success(function (data) {
                    $scope.newUserMessage = data;
                });
    };*/

    $scope.updateUser = function() {
        var userDetails = {
            'local':{
                'username' : $scope.user.local.username,
                'password' : $scope.user.local.password
            },
            'firstName':  $scope.user.firstName,
            'lastName': $scope.user.lastName,
            'email': $scope.user.email,
            'mobileNumber': $scope.user.mobileNumber,
            'location': $scope.user.location
        };
        User.update(userDetails)
            .success(function (data) {
                $scope.updateMessage = data;
            });
    }

});
var checking;
usermod.directive('ensureUnique', ['$http', '$timeout', function($http, $timeout) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function() {
                if (!checking && c.$dirty ) {
                    checking = $timeout(function() {
                        $http({
                            method: 'POST',
                            url: '/api/check/' + scope.$eval(attrs.ensureUnique)
                        }).success(function(data, status, headers, cfg) {
                            if(data != null){
                                c.$setValidity('unique', false);
                            }else{
                                c.$setValidity('unique', true);
                            }
                            checking = null;
                        });
                    }, 500);
                }
            });
        }
    }
}]);