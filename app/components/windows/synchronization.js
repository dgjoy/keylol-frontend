(function () {
    "use strict";

    keylolApp.controller("SynchronizationController", [
        "$scope", "close",
        function ($scope, close) {
            $scope.cancel = function () {
                close();
            };
            $scope.hasPoint = false;
        }
    ]);
})();