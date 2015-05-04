angular.module('RegistrationCtrl', []).controller('RegistrationController', function($scope, User) {

    $scope.tagline = 'Register!';

    $scope.regForm.submitTheForm = function(item, event) {
        User.create($scope.regForm);
    }

});