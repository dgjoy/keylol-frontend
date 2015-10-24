(function () {
    "use strict";

    keylolApp.controller("PointSelectorController", [
        "$scope", "$window", "close", "union", "selected", "pointArray",
        function ($scope, $window, close, union, selected, pointArray) {
            $scope.pointArray = pointArray;
            for (var i in $scope.pointArray) {
                $scope.pointArray[i].selected = false;
                switch ($scope.pointArray[i].Type) {
                    case 0:
                        $scope.pointArray[i].type = "游戏";
                        break;
                    case 1:
                        $scope.pointArray[i].type = "类型";
                        break;
                    case 2:
                        $scope.pointArray[i].type = "厂商";
                        break;
                    case 3:
                        $scope.pointArray[i].type = "平台";
                        break;
                }
            }
            $scope.pointArray[selected].selected = true;
            $scope.changeSelector = function (newSelected) {
                $scope.pointArray[selected].selected = false;
                selected = newSelected;
                $scope.pointArray[newSelected].selected = true;
            };
            $scope.selectPoint = function () {
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
                    }
                });
            };
            $window.addEventListener("keydown", union.keydownCallback, true);
        }
    ]);
})();