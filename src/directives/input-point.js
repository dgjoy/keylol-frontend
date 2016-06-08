(function () {
    keylolApp.directive('inputPoint', ($window, union, $timeout, $http, utils, apiEndpoint, notification) => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/input-point.html',
            scope: {
                theme: '<',
                typeWhitelist: '<',
                limit: '<',
                state: '<',
                focusHandler: '&',
                blurHandler: '&',
                cacheHandler: '&',
            },
            require: 'ngModel',
            link (scope, element, attrs, ngModel) {
                scope.utils = utils;
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
                                const params  = {
                                    keyword: newValue,
                                };
                                if (scope.typeWhitelist) {
                                    params.type_whitelist = scope.typeWhitelist.toString();
                                }
                                $http.get(`${apiEndpoint}states/point-query-results`, {
                                    params,
                                }).then(response => {
                                    if (response.data.length > 0) {
                                        const pointArray = response.data;
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
                                }, response => {
                                    notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                                });
                            }
                        }, 200);
                    });
                    scope.focusHandler();
                    scope.$apply();
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
                        if (scope.pointArray[i].id === result.id) {
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
    });
}());
