(function () {
    keylolApp.controller("LogoController", [
        "$scope", "$http", "apiEndpoint", "union", "$rootScope", "$location",
        ($scope, $http, apiEndpoint, union, $rootScope, $location) => {
            $scope.union = union;
            $scope.emitRefresh = function () {
                if ($location.url() === "/") {
                    $rootScope.$emit("homeRefresh");
                }
            };
        },
    ]);
}());
