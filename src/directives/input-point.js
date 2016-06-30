(function () {
    keylolApp.directive('inputPoint', ($window, $timeout, $http, utils, apiEndpoint, notification) => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/input-point.html',
            scope: {
                theme: '<',
                typeWhitelist: '<',
                options: '<',
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
                scope.previewPopup = [];

                ngModel.$render = function () {
                    if (ngModel.$viewValue) {
                        scope.pointArray = ngModel.$viewValue;
                    }
                };

                // scope.showPreview = function ($index, $event) {
                //     scope.previewPopup[$index]({
                //         templateUrl: 'src/popup/point-preview-card.html',
                //         controller: 'PointPreviewCardController as pointPreviewCard',
                //         attachSide: 'bottom',
                //         event: $event,
                //         align: 'center',
                //         // inputs: {
                //         //     idCode: scope.pointArray[$index].idCode,
                //         // },
                //     });
                // };

                scope.deleteSelectorPoint = function (index) {
                    scope.pointArray.splice(index, 1);
                };

                scope.selectPoint = function (index, $event) {
                    scope.pointArray[index].selected = true;
                    $window.addEventListener('click', clickCallback, true);
                    $window.addEventListener('keydown', keydownCallback, true);
                    function keydownCallback (e) {
                        scope.$apply(() => {
                            scope.pointArray[index].selected = false;
                            if (e.keyCode === 8) {
                                scope.deleteSelectorPoint(index);
                                if (index < scope.pointArray.length) {
                                    scope.selectPoint(index);
                                }
                            } else if (e.keyCode === 37 && index > 0) {
                                scope.selectPoint(index - 1);
                            } else if (e.keyCode === 39 && index < scope.pointArray.length - 1) {
                                scope.selectPoint(index + 1);
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

                    if ($event) {
                        $event.stopPropagation();
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
                            $($window).off('keydown.pointSelector');
                            if (newValue) {
                                const params  = {
                                    keyword: newValue,
                                };
                                if (scope.typeWhitelist) {
                                    params.type_whitelist = scope.typeWhitelist.toString();
                                }
                                $.extend(params, scope.options);
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
                    $($window).off('keydown.pointSelector');
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
                }

                function deleteKeyCallback (e) {
                    scope.$apply(() => {
                        if (e.keyCode === 8 && scope.pointArray.length > 0 && !scope.data) {
                            scope.pointArray.splice(-1, 1);
                        }
                    });
                }
            },
        };
    });
}());
