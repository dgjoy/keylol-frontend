(function () {
    "use strict";

    keylolApp.controller("PointInfoController", [
        "$scope", "union", "window", "utils",
        function ($scope, union, window, utils) {
            $scope.utils = utils;
            $scope.point = union.point;
            $scope.showShortReviewWindow = function () {
                window.show({
                    templateUrl: "components/windows/short-review.html",
                    controller: "ShortReviewController",
                    inputs: {
                        options: {
                            point: {
                                Id: $scope.point.Id,
                                IdCode:  $scope.point.IdCode,
                                CoverImage: $scope.point.CoverImage,
                                Name: utils.getPointFirstName($scope.point)
                            },
                            gameHours: 790.5
                        }
                    }
                });
                return true;
            };
        }
    ]);
})();