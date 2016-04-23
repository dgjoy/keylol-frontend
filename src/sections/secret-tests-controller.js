(function () {
    keylolApp.controller('SecretTestsController', [
        '$scope', 'window', '$http', 'notification',
        ($scope, window, $http, notification) => {
            $scope.showPointListWindow = function () {
                window.show({
                    templateUrl: 'src/windows/point-list.html',
                    controller: 'PointListController',
                });
            };
        },
    ]);
}());
