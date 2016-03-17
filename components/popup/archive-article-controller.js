(function () {
    "use strict";

    keylolApp.controller("ArchiveArticleController", [
        "$scope", "close", "$http", "notification", "$filter", "utils",
        function ($scope, close, $http, notification, $filter, utils) {
            $scope.utils = utils;
        }
    ]);
})();