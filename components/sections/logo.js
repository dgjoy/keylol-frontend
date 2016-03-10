(function () {
    "use strict";

    keylolApp.controller("LogoController", [
        "$scope", "$http", "apiEndpoint", "union",
        function ($scope, $http, apiEndpoint, union) {
            $scope.union = union;
        }
    ]);
})();