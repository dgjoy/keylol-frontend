(function () {
    "use strict";

    keylolApp.controller("PointVotesController", [
        "$scope", "union", "utils",
        function ($scope, union, utils) {
            $scope.point = union.point;
            $scope.utils = utils;
        }
    ]);
})();