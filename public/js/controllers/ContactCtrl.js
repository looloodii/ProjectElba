contact = angular.module('ContactCtrl', []);

contact.controller('ContactController', function ($scope, Inquiry) {

    $scope.init = function() {
        $scope.contactForm = {
            inquiryType : "Custom Order"
        }
    };

    $scope.init();

    $scope.sendInquiry = function () {
        if ($scope.contactform.$invalid) {
            $scope.submitted = false;
        } else {
            Inquiry.create($scope.contactForm)
                .success(function (data) {
                    $scope.mailMsg = "Thank you for leaving us a message.";
                    $scope.init();
                    $scope.submitted = true;
                });
        }

    };

});