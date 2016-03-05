(function () {
    "use strict";

    keylolApp.controller("RelatedPointsController", [
        "$scope", "union", "utils",
        function ($scope, union, utils) {
            $scope.union = union;
            $scope.utils = utils;
        }
    ]);
})();