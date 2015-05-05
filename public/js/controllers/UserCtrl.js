angular.module('UserCtrl', []).controller('UserController', function($scope, User) {

    $scope.tagline = 'Register Now!';

    $scope.login = function(){
        var userDetails = {
            'username' : $scope.login.username,
            'password' : $scope.login.password
        };

        User.login(userDetails)
            .success(function (data) {
                $scope.loggedIn() == true;
                //$scope.newUserMessage = data;
            });


    };

    $scope.createUser = function() {
        //$scope.submitted = false;
       // if ($scope.orderform.$valid) {
            // Submit as normal



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

        /*} else {
            $scope.orderform.submitted = true;
            console.log('Invalid form.');
            console.log($scope.orderform.$error);
            console.log($scope.orderdate);
        }*/
    }

});