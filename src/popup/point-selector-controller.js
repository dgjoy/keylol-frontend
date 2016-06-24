(function () {
    class PointSelectorController {
        constructor($scope, $window, close, union, selected, pointArray, utils) {
            this.pointArray = pointArray;

            this.utils = utils;
            for (let i = 0;i < this.pointArray.length;i++) {
                this.pointArray[i].selected = false;
            }
            this.pointArray[selected].selected = true;
            let selector = selected;
            this.changeSelector = function (newSelected) {
                this.pointArray[selector].selected = false;
                selector = newSelected;
                this.pointArray[newSelected].selected = true;
            };
            this.selectPoint = function () {
                this.pointArray[selector].selected = false;
                close(this.pointArray[selector]);
            };
            union.keydownCallback = e => {
                $scope.$apply(() => {
                    if (e.keyCode === 40) {
                        if (selector < this.pointArray.length - 1) {
                            this.changeSelector(selector + 1);
                        } else {
                            this.changeSelector(0);
                        }
                    } else if (e.keyCode === 38) {
                        if (selector > 0) {
                            this.changeSelector(selector - 1);
                        } else {
                            this.changeSelector(this.pointArray.length - 1);
                        }
                    } else if (e.keyCode === 13) {
                        this.selectPoint(e);
                        e.preventDefault();
                    }
                });
            };
            $window.addEventListener('keydown', union.keydownCallback, true);
        }
    }

    keylolApp.controller('PointSelectorController',PointSelectorController);
}());
