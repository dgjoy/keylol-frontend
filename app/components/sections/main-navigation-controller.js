(function () {
    "use strict";

    keylolApp.controller("MainNavigationController", [
        "$scope", "$http", "apiEndpoint", "utils", "union",
        function ($scope, $http, apiEndpoint, utils, union) {
            $scope.utils = utils;
            $scope.categories = union.$localStorage.mainNavigation;
            $http.get(apiEndpoint + "normal-point/active-of-each-type").then(function (response) {
                union.$localStorage.mainNavigation = $scope.categories = response.data;
            });
        }
    ]);
})();