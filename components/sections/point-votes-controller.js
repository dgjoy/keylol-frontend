(function () {
    "use strict";

    keylolApp.controller("PointVotesController", [
        "$scope", "union", "utils",
        function ($scope, union, utils) {
            $scope.point = union.point;
            console.log($scope.point);
            $scope.utils = utils;
            $scope.circles = [new Array(1),new Array(2),new Array(3),new Array(4),new Array(5)];
        }
    ]);
})();