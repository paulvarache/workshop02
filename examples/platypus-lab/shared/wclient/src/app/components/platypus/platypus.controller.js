angular.module('PlatypusLab.platypus')

.controller('PlatypusListController', ['$scope',
                                        '$rootScope',
                                        '$mdDialog',
                                        '$location',
                                        'platypuses',
                                        function ($scope, $rootScope, $mdDialog, $location, platypuses) {
    $scope.platypuses = platypuses;
    $scope.toolbar = {
        isOpen: false
    };
    $scope.select = function (platypus) {
        platypus.selected = !platypus.selected;
        $scope.editing = $scope.platypuses.filter(function (pl) {
            return pl.selected;
        });
    };
    $scope.delete = function (ev) {
        $mdDialog.show({
            controller: 'PlatypusDeleteController',
            templateUrl: 'templates/platypus.delete.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: { platypuses: $scope.editing }
        }).then(function () {
            $scope.editing = $scope.editing.map(function (item) {
                return item._id;
            });
            $scope.platypuses = $scope.platypuses.filter(function(i) {return $scope.editing.indexOf(i._id) === -1;});
            $scope.editing = [];
        });
    };
    $scope.add = function (ev) {
        $mdDialog.show({
            controller: 'PlatypusAddController',
            templateUrl: 'templates/platypus.add.html',
            parent: angular.element(document.body),
            targetEvent: ev
        })
        .then(function (platypus) {
            if (platypus) $scope.platypuses.push(platypus);
        });
    };
    $scope.goToPlatypus = function (id, event) {
        $location.path('/platypus/' + id);
    };
}])

.controller('PlatypusAddController', ['$scope', '$mdDialog', 'Api', function ($scope, $mdDialog, Api) {
    $scope.platypus = {};
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.save = function () {
        Api.addPlatypus($scope.platypus)
            .success(function (platypus) {
                $mdDialog.hide(platypus);
            });
    };
}])

.controller('PlatypusDeleteController', [
                                    '$scope',
                                    '$mdDialog',
                                    '$q',
                                    'Api',
                                    'platypuses',
                                    function ($scope, $mdDialog, $q, Api, platypuses) {

    $scope.platypuses = platypuses;
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.save = function () {
        var tasks = platypuses.map(function (pl) {
            return Api.deletePlatypus(pl);
        });
        $q.all(tasks).then(function () {
            $mdDialog.hide();
        }).catch(function (reason) {
            console.error(reason);
        });
    };
}])

.controller('PlatypusDetailsController', ['$scope', '$rootScope', 'platypus', function ($scope, $rootScope, platypus) {
    $scope.platypus = platypus;
    $scope.$on('$destroy', function () {
        $rootScope.color.dominant = [63, 81, 181];
    })
}]);