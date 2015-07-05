angular.module('PlatypusLab.service')

.service('Api', ['$http', 'APIUrls', '$mdToast', function ($http, APIUrls, $mdToast) {
    function onError(reason, statusCode) {
        console.log(reason, statusCode);
        var toast = $mdToast.simple();
        if (!reason && statusCode === 0)
            toast = toast.content('The Platypus API does not seem to be online');
        $mdToast.show(toast);
    }

    return {
        listPlatypuses: function () {
            return $http.get(APIUrls.getUrl('platypuses')).error(onError);
        },
        getPlatypus: function (id) {
            return $http.get(APIUrls.getUrl('platypus', id)).error(onError);
        },
        addPlatypus: function (platypus) {
            return $http.post(APIUrls.getUrl('platypuses'), platypus).error(onError);
        },
        deletePlatypus: function (platypus) {
            return $http.delete(APIUrls.getUrl('platypus', platypus._id)).error(onError);
        }
    };
}]);