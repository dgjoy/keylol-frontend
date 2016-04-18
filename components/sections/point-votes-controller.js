﻿(function () {
    keylolApp.controller("PointVotesController", [
        "$scope", "union", "utils",
        ($scope, union, utils) => {
            $scope.point = union.point;
            $scope.utils = utils;
            $scope.circles = [new Array(1), new Array(2), new Array(3), new Array(4), new Array(5)];
        },
    ]);
}());
