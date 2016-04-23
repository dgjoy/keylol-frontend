(function () {
    keylolApp.controller('PointSelectorController', [
        '$scope', '$window', 'close', 'union', 'selected', 'pointArray', 'utils', 'window',
        ($scope, $window, close, union, selected, pointArray, utils, window) => {
            $scope.pointArray = pointArray;
            $scope.pointArray.push({
                AvatarImage: 'assets/images/addition-icon.png',
                ChineseName: '开设新据点',
                EnglishName: '没有找到你要的游戏？',
                PreferredName: 'Chinese',
            });
            $scope.utils = utils;
            for (let i = 0;i < $scope.pointArray.length;i++) {
                $scope.pointArray[i].selected = false;
            }
            $scope.pointArray[selected].selected = true;
            let selector = selected;
            $scope.changeSelector = function (newSelected) {
                $scope.pointArray[selector].selected = false;
                selector = newSelected;
                $scope.pointArray[newSelected].selected = true;
            };
            $scope.selectPoint = function () {
                if (selector !== $scope.pointArray.length - 1) {
                    $scope.pointArray[selector].selected = false;
                    close($scope.pointArray[selector]);
                } else {
                    window.show({
                        templateUrl: 'src/windows/shop-link.html',
                        controller: 'ShopLinkController',
                    });
                }
            };
            union.keydownCallback = function (e) {
                $scope.$apply(() => {
                    if (e.keyCode === 40) {
                        if (selector < $scope.pointArray.length - 1) {
                            $scope.changeSelector(selector + 1);
                        } else {
                            $scope.changeSelector(0);
                        }
                    } else if (e.keyCode === 38) {
                        if (selector > 0) {
                            $scope.changeSelector(selector - 1);
                        } else {
                            $scope.changeSelector($scope.pointArray.length - 1);
                        }
                    } else if (e.keyCode === 13) {
                        $scope.selectPoint(e);
                        e.preventDefault();
                    }
                });
            };
            $window.addEventListener('keydown', union.keydownCallback, true);
        },
    ]);
}());
