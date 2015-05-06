angular.module('UserCtrl', []).controller('UserController', function($scope, User, $route, $location) {

    $scope.tagline = 'Sign Up Now!';

    $scope.regEmail =  $route.current.params.regEmail;
    var username = $route.current.params.username;
    var loc = $location.path();

    if(loc == "/account"){
        var obj = {};
        User.verify(obj).success(function (data) {
            if(data!=null){
                $scope.user = data;
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

    $scope.createUser = function() {
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
    }

});