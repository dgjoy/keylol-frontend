(function () {
    "use strict";

    keylolApp.controller("PointSelectorController", [
        "$scope", "$window", "close", "union", "selected", "pointArray", "utils",
        function ($scope, $window, close, union, selected, pointArray, utils) {
            $scope.pointArray = pointArray;
            $scope.utils = utils;
            for (var i in $scope.pointArray) {
                $scope.pointArray[i].selected = false;
            }
            $scope.pointArray[selected].selected = true;
            $scope.changeSelector = function (newSelected) {
                $scope.pointArray[selected].selected = false;
                selected = newSelected;
                $scope.pointArray[newSelected].selected = true;
            };
            $scope.selectPoint = function () {
                $scope.pointArray[selected].selected = false;
                close($scope.pointArray[selected]);
            };
            union.keydownCallback = function (e) {
                $scope.$apply(function () {
                    if (e.keyCode == 40) {
                        if (selected < $scope.pointArray.length - 1) {
                            $scope.changeSelector(selected + 1);
                        } else {
                            $scope.changeSelector(0);
                        }
                    } else if (e.keyCode == 38) {
                        if (selected > 0) {
                            $scope.changeSelector(selected - 1);
                        } else {
                            $scope.changeSelector($scope.pointArray.length - 1);
                        }
                    } else if (e.keyCode == 13) {
                        $scope.selectPoint(e);
                        e.preventDefault();
                    }
                });
            };
            $window.addEventListener("keydown", union.keydownCallback, true);
        }
    ]);
})();