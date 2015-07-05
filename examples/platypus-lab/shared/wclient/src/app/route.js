angular.module('PlatypusLab')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/platypus.list.html',
                controller: 'PlatypusListController',
                resolve: {
                    platypuses: ['Api', function (Api) {
                        return Api.listPlatypuses().then(function (res) { return res.data; } );
                    }]
                }
            })
            .when('/platypus/:id', {
                templateUrl: 'templates/platypus.details.html',
                controller: 'PlatypusDetailsController',
                resolve: {
                    platypus: ['Api', '$route', function (Api, $route) {
                        return Api.getPlatypus($route.current.params.id).then(function (res) { return res.data; } );
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);