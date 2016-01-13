(function () {
    "use strict";

    keylolApp.controller("ShopLinkController", [
        "$scope", "close", "window", "apiEndpoint", "utils", "notification",
        function ($scope, close, window, apiEndpoint, utils, notification) {
            $scope.cancel = function () {
                close();
            };
            $scope.submit = function () {
                window.show({
                    templateUrl: "components/windows/confirmation.html",
                    controller: "ConfirmationController"
                });
                close();
            };
        }
    ]);
})();