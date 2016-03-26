(function () {
    "use strict";

    keylolApp.controller("SecretTestsController", [
        "$scope", "window", "$http", "notification",
        function ($scope, window, $http, notification) {
            $scope.showArchiveWindow = function () {
                window.show({
                    templateUrl: "components/windows/missive.html",
                    controller: "MissiveController"
                });
            };
            $scope.showPointListWindow = function () {
                window.show({
                    templateUrl: "components/windows/point-list.html",
                    controller: "PointListController"
                });
            };
        }
    ]);
})();