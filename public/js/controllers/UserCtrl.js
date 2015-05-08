var usermod = angular.module('UserCtrl', []);
usermod.controller('UserController', function($window, $scope, User, $route, $location) {


    $scope.tagline = 'Sign Up Now!';

    $scope.regEmail =  $route.current.params.regEmail;
    var username = $route.current.params.username;
    var loc = $location.path();

    if(loc == "/account"){

        if($window.localStorage.getItem('user')==null){
            $location.path('/signin');
        }else{
            $scope.user = angular.fromJson($window.localStorage['user']);
        }

        /*var obj = {};
        User.verify(obj).success(function (data) {
            if(data!=null){
                $scope.user = data;
                console.log("In verify success");
                $window.localStorage.setItem('user', angular.toJson(data));
                console.log("localStorage: " + $window.localStorage.getItem('user'));
            }
            else{
                $location.path('/signin');
            }
        }).error(function (data) {
            console.log("error");
        });*/

    }

    if(username!=null) {
        User.get(username).success(function (data) {
            $scope.user = data;
            if ($scope.user.local == undefined) {
                $location.path('/signin');
            }else{
                $window.localStorage.setItem('user', angular.toJson(data));
            }
        });
    }

    $scope.logout = function(){
        User.logout()
            .success(function (data) {
                $window.localStorage.removeItem('user');
                $location.path('/signin');
            });
    };


    $scope.login = function (req, res, next){

        var userDetails = {
            'username' : $scope.login.username,
            'password' : $scope.login.password
        };

        /*User.login(userDetails)
            .success(function (data) {
                console.log("In login success");
                $scope.loggedIn == true;
                $window.localStorage.setItem('user', angular.toJson(data));
                console.log("localStorage: " + $window.localStorage.getItem('user'));
            });*/
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
