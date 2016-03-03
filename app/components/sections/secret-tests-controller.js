(function () {
    "use strict";

    keylolApp.controller("SecretTestsController", [
        "$scope", "window",
        function ($scope, window) {
            $scope.showSyncWindow = function () {
                window.show({
                    templateUrl: "components/windows/synchronization.html",
                    controller: "SynchronizationController"
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