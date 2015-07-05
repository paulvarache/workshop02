angular.module('PlatypusLab', [
                                'ngRoute',
                                'ngMaterial',
                                'pvarache.APIUrls',
                                'ngMockE2E',
                                'ngColorThief',
                                'PlatypusLab.controller',
                                'PlatypusLab.service',
                                'PlatypusLab.platypus'
    ])

    .config(['APIUrlsProvider', function (APIUrlsProvider) {
        APIUrlsProvider.hostname = 'localhost';
        APIUrlsProvider.secure = false;
        APIUrlsProvider.port = 3000;
        APIUrlsProvider.urls = {
            platypuses: '/platypuses',
            platypus: function (id) {
                return '/platypuses/' + id;
            }
        };
    }])
    .directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    });