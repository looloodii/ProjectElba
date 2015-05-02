angular.module('RegistrationCtrl', []).controller('RegistrationController', function($scope, User) {

    $scope.tagline = 'Register!';
    $scope.user = {};
    $scope.username = "";
    $scope.user.email = $scope.formInfo.email;

    //$scope.formInfo.email = "";

     $scope.sendRegistration = function(req) {
        console.log("to post");
        //User.create(req);
     }

});