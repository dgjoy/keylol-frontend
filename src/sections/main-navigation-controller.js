(function () {
    keylolApp.controller("MainNavigationController", [
        "$scope", "$http", "apiEndpoint", "utils", "union",
        ($scope, $http, apiEndpoint, utils, union) => {
            $scope.utils = utils;
            $scope.categories = union.$localStorage.mainNavigation;
            $http.get(`${apiEndpoint}normal-point/active-of-each-type`).then(response => {
                union.$localStorage.mainNavigation = $scope.categories = response.data;
            });
        },
    ]);
}());
