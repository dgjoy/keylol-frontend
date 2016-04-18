﻿(function () {
    keylolApp.controller("ArticleReviewController", [
        "$scope", "union", "window", "utils",
        ($scope, union, window, utils) => {
            $scope.utils = utils;
            $scope.article = union.article;
            $scope.point = union.point;
            $scope.summary = union.summary;
        },
    ]);
}());
