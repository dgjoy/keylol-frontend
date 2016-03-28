(function () {
    "use strict";

    keylolApp.controller("MissiveController", [
        "$scope", "close", "$timeout", "$http", "notification", "message",
        function ($scope, close, $timeout, $http, notification, message) {
            $scope.cancel = function () {
                close();
            };
        }
    ]);
})();