angular.module('SplashCtrl', []).controller('SplashController', function ($scope) {

    $scope.splashInterval = 3000;
    $scope.splashSlides = [
        {
            image: 'http://res.cloudinary.com/chassiness/image/upload/b_rgb:000,c_crop,h_600,o_70,w_1200/v1428659989/P1150472_lf4emt.jpg',
            heading: 'Eat cake for breakfast',
            caption: 'Because #YOLO!'
        },
        {
            image: 'http://res.cloudinary.com/chassiness/image/upload/b_rgb:000,bo_0px_solid_rgb:000,c_crop,h_600,o_70,q_100,w_1200/v1428656545/P1160547_ouystw.png',
            heading: 'Sweets for my sweet',
            caption: 'Sugar for my honey'
        },
        {
            image: 'http://res.cloudinary.com/chassiness/image/upload/b_rgb:000,c_crop,h_600,o_70,w_1200/v1428659966/P1110818_z7ka8t.jpg',
            heading: 'You can\'t buy happiness',
            caption: 'But you can buy CUPCAKES and that\'s kind of the same thing.'
        }
    ];

});


