(function () {
    "use strict";

    keylolApp.controller("PromotedReadingsController", [
        "$scope", "$http", "apiEndpoint", "union",
        function ($scope, $http, apiEndpoint, union) {
            $scope.articles = union.$localStorage.promotedReadings;
            $http.get(apiEndpoint + "article/spotlight").then(function (response) {
                union.$localStorage.promotedReadings = $scope.articles = response.data;
            });
        }
    ]);
})();