(function () {
    "use strict";

    keylolApp.controller("ConfirmationController", [
        "$scope", "close", "window", "apiEndpoint", "utils", "notification",
        function ($scope, close, window, apiEndpoint, utils, notification) {
            $scope.cancel = function () {
                close();
            };
            $scope.submit = function () {
            };
            $scope.switchToEditInfo = function () {
                window.show({
                    templateUrl: "components/windows/point-settings.html",
                    controller: "PointSettingsController"
                });
                close();
            }
        }
    ]);
})();