(function () {
    "use strict";

    keylolApp.controller("PromotedReadingsController", [
        "$scope", "$http", "apiEndpoint",
        function ($scope, $http, apiEndpoint) {
            $http.get(apiEndpoint + "article/hot").then(function (response) {
                $scope.articles = response.data;
            });
        }
    ]);
})();