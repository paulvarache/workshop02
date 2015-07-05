angular.module('PlatypusLab')

    .controller('LayoutController', ['$scope', '$rootScope', '$mdDialog', function ($scope, $rootScope, $mdDialog) {
        $scope.$on('$routeChangeStart', function (event, toRoute) {
            if (toRoute && toRoute.$$route) {
                $scope.path = toRoute.$$route.originalPath;
            }
        });

        $rootScope.color = {
            dominant: [63, 81, 181]
        };

    }])

    .filter('rgbArray', function () {
        return function (rgb) {
            return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        };
    });