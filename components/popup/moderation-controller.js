(function () {
    "use strict";

    keylolApp.controller("ModerationController", [
        "$scope", "close", "$http", "notification", "$filter", "utils", "type",
        function ($scope, close, $http, notification, $filter, utils, type) {
            $scope.utils = utils;
        }
    ]);
})();