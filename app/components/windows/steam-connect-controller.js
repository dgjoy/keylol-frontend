(function () {
    "use strict";

    keylolApp.controller("SteamConnectController", [
        "$scope", "close",
        function ($scope, close) {
            $scope.cancel = function () {
                close();
            };
            $scope.currentStation = 1;
        }
    ]);
})();