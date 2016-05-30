(function () {
    keylolApp.directive('inputPoint', [
        '$window', 'union', '$timeout', '$http',
        ($window, union, $timeout, $http) => {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/input-point.html',
                scope: {
                    limit: '<',
                    state: '<',
                    focusHandler: '&',
                    blurHandler: '&',
                    cacheHandler: '&',
                },
                require: 'ngModel',
                link (scope, element, attrs, ngModel) {
                    scope.data = '';

                    ngModel.$render = function () {
                        scope.pointArray = [];
                        if (ngModel.$viewValue) {
                            for (let i = 0; i < ngModel.$viewValue.length; i++) {
                                scope.pointArray.push(ngModel.$viewValue[i]);
                            }
                        }
                    };

                    scope.deleteSelectorPoint = function (index) {
                        scope.pointArray.splice(index, 1);
                        ngModel.$setViewValue(scope.pointArray);
                    };

                    scope.selectPoint = function (index) {
                        scope.pointArray[index].selected = true;
                        $window.addEventListener('click', clickCallback, true);
                        $window.addEventListener('keydown', keydownCallback, true);
                        function keydownCallback (e) {
                            scope.$apply(() => {
                                scope.pointArray[index].selected = false;
                                if (e.keyCode === 8) {
                                    scope.deleteSelectorPoint(index);
                                }
                                $window.removeEventListener('click', clickCallback, true);
                                $window.removeEventListener('keydown', keydownCallback, true);
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        }
                        function clickCallback (e) {
                            scope.$apply(() => {
                                scope.pointArray[index].selected = false;
                                $window.removeEventListener('click', clickCallback, true);
                                $window.removeEventListener('keydown', keydownCallback, true);
                            });
                        }
                    };

                    const $input = element.find('.input');

                    element.click(e => {
                        if (e.target !== $input[0]) {
                            $input.focus();
                        }
                        scope.focusHandler();
                        scope.$apply();
                    });

                    $input.focus(() => {
                        $window.addEventListener('keydown', deleteKeyCallback, true);
                        scope.disWatchData = scope.$watch('data', newValue => {
                            if (newValue.length === 0) {
                                scope.cacheHandler({ isEmpty:true });
                            } else {
                                scope.cacheHandler({ isEmpty:false });
                            }

                            if (scope.dataChangeTimeout) {
                                $timeout.cancel(scope.dataChangeTimeout);
                            }

                            if ( scope.pointArray.length >= scope.limit) {
                                return;
                            }

                            scope.dataChangeTimeout = $timeout(() => {
                                if (scope.nowPopup) {
                                    scope.nowPopup.then(popup => {
                                        popup.closeNow();
                                    });
                                }
                                $window.removeEventListener('keydown', union.keydownCallback, true);
                                if (newValue) {
                                    const response = {
                                        data: [{
                                            avatarImage: '//storage.keylol.com/e68a01e5abdfaf273f06fadf353450e4.jpg',
                                            chineseName: '刺客信条',
                                            englishName: 'AC',
                                            Id: 'AC1',
                                        },{
                                            avatarImage: '//storage.keylol.com/e68a01e5abdfaf273f06fadf353450e4.jpg',
                                            chineseName: '刺客信条2',
                                            englishName: 'AC2',
                                            Id: 'AC2',
                                        },{
                                            avatarImage: '//storage.keylol.com/e68a01e5abdfaf273f06fadf353450e4.jpg',
                                            chineseName: '刺客信条3',
                                            englishName: 'AC3',
                                            Id: 'AC3',
                                        }],
                                    };

                                    const pointArray = response.data.length ? response.data : [];
                                    scope.nowPopup = scope.showSelector({
                                        templateUrl: 'src/popup/point-selector.html',
                                        controller: 'PointSelectorController as pointSelector',
                                        attachSide: 'bottom',
                                        event: {
                                            type: 'click',
                                            currentTarget: element,
                                        },
                                        align: 'left',
                                        offsetX: -8,
                                        inputs: {
                                            selected: 0,
                                            pointArray,
                                        },
                                    });
                                    scope.nowPopup.then(popup => {
                                        return popup.close;
                                    }).then(result => {
                                        if (result) {
                                            addPoint(result);
                                        }
                                    });
                                }
                            }, 200);
                        });
                    });

                    $input.blur(() => {
                        if (scope.dataChangeTimeout) {
                            $timeout.cancel(scope.dataChangeTimeout);
                        }
                        $window.removeEventListener('keydown', deleteKeyCallback, true);
                        scope.disWatchData();
                        scope.blurHandler();
                        scope.$apply();
                    });

                    function addPoint (result) {
                        let hasBeenExist = false;
                        for (let i = 0; i < scope.pointArray.length; i++) {
                            if (scope.pointArray[i].Id === result.Id) {
                                hasBeenExist = true;
                            }
                        }
                        if (!(hasBeenExist || scope.pointArray.length >= scope.limit)) {
                            scope.pointArray.push(result);
                        }
                        scope.data = '';
                        ngModel.$setViewValue(scope.pointArray);
                    }

                    function deleteKeyCallback (e) {
                        scope.$apply(() => {
                            if (e.keyCode === 8 && scope.pointArray.length > 0 && !scope.data) {
                                scope.pointArray.splice(-1, 1);
                                ngModel.$setViewValue(scope.pointArray);
                            }
                        });
                    }
                },
            };
    }]);
}());
