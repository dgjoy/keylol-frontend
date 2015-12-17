(function () {
    "use strict";

    keylolApp.controller("ShortReviewController", [
        "$scope", "close", "utils", "$http", "union", "$timeout", "$location", "notification", "articleTypes", "$route",
        function ($scope, close, utils, $http, union, $timeout, $location, notification, articleTypes, $route) {

            $scope.cancel = function () {
                close();
            };
        }
    ]);
})();