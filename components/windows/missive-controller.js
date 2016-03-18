(function () {
    "use strict";

    keylolApp.controller("MissiveController", [
        "$scope", "close", "$timeout", "$http", "notification",
        function ($scope, close, $timeout, $http, notification) {
            $scope.cancel = function () {
                close();
            };
        }
    ]);
})();