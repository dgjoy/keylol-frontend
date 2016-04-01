(function () {
    "use strict";

    keylolApp.controller("LogoController", [
        "$scope", "$http", "apiEndpoint", "union", "$rootScope", "$location",
        function ($scope, $http, apiEndpoint, union, $rootScope, $location) {
            $scope.union = union;
            $scope.emitRefresh = function () {
                if ($location.url() === "/home") {
                    $rootScope.$emit("homeRefresh");
                }
            }
        }
    ]);
})();