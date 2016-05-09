(function () {
    keylolApp.directive('inputPoint', [
        '$window', 'union', '$timeout', '$http',
        ($window, union, $timeout, $http) => {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/input-point.html',
                scope: {
                    placeholder: '=',
                    limit: '=',
                    forbidden: '=',
                    type: '=',
                },
                require: 'ngModel',
                link (scope, element, attrs, ngModel) {
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
                        if (e.target === $input[0] || $(e.target).is(element.find('.point-title'))) return;
                        element.children('input').focus();
                    });

                    $input.focus(() => {
                        $window.addEventListener('keydown', deleteKeyCallback, true);
                        scope.disWatchData = scope.$watch('data', newValue => {
                            if (scope.dataChangeTimeout) {
                                $timeout.cancel(scope.dataChangeTimeout);
                            }
                            scope.dataChangeTimeout = $timeout(() => {
                                if (scope.nowPopup) {
                                    scope.nowPopup.then(popup => {
                                        popup.closeNow();
                                    });
                                }
                                $window.removeEventListener('keydown', union.keydownCallback, true);
                                if (newValue) {
                                    $http.get(`${apiEndpoint}normal-point/keyword/${encodeURIComponent(newValue)}`, {
                                        params: { typeFilter: scope.type || '' },
                                    }).then(response => {
                                        const pointArray = response.data.length ? response.data : [];
                                        scope.nowPopup = scope.showSelector({
                                            templateUrl: 'src/popup/point-selector.html',
                                            controller: 'PointSelectorController',
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
                    });

                    scope.linkHover = function ($event, $index) {
                        scope.pointArray[$index].showPointCard({
                            templateUrl: 'src/popup/point-preview-card.html',
                            controller: 'PointPreviewCardController',
                            event: $event,
                            attachSide: 'bottom',
                            align: 'left',
                            inputs: {
                                idCode: scope.pointArray[$index].IdCode,
                                type: 'point',
                            },
                        });
                    };

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
