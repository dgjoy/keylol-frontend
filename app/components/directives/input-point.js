(function () {
    "use strict";

    keylolApp.directive("inputPoint", [
        "$window", "union", "$timeout", "$http",
        function ($window, union, $timeout, $http) {
            return {
                restrict: "E",
                templateUrl: "components/directives/input-point.html",
                scope: {
                    placeholder: "="
                },
                require: "ngModel",
                link: function (scope, element, attrs, ngModel) {
                    var focusLock = false;
                    scope.pointArray = [];
                    console.log(scope.placeholder);
                    var placeholder = scope.placeholder;
                    scope.placeholder = placeholder;
                    scope.hasPlaceholder = true;
                    var addPoint = function (result) {
                        scope.pointArray.push({
                            title: result.ChineseName,
                            selected: false,
                            id: result.Id
                        });
                        scope.data = "";
                        ngModel.$setViewValue(scope.pointArray);
                    };
                    var deleteSelectorPoint = function (index) {
                        scope.pointArray.splice(index, 1);
                        ngModel.$setViewValue(scope.pointArray);
                    };
                    var deleteKeyCallback = function (e) {
                        scope.$apply(function () {
                            if (e.keyCode == 8 && scope.pointArray.length > 0 && scope.data == "") {
                                scope.pointArray.splice(-1, 1);
                            }
                        });
                    };
                    scope.selectPoint = function (index, $event) {
                        scope.pointArray[index].selected = true;
                        var keydownCallback = function (e) {
                            scope.$apply(function () {
                                console.log("key");
                                scope.pointArray[index].selected = false;
                                if (e.keyCode == 8) {
                                    deleteSelectorPoint(index);
                                }
                                $window.removeEventListener("click", clickCallback, true);
                                $window.removeEventListener("keydown", keydownCallback, true);
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        };
                        var clickCallback = function (e) {
                            scope.$apply(function () {
                                console.log("click");
                                scope.pointArray[index].selected = false;
                                $window.removeEventListener("click", clickCallback, true);
                                $window.removeEventListener("keydown", keydownCallback, true);
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        };
                        $window.addEventListener("click", clickCallback, true);
                        $window.addEventListener("keydown", keydownCallback, true);
                        $event.stopPropagation();
                        $event.preventDefault();
                    };

                    var changgePlaceholder = function () {
                        if (!scope.data && scope.pointArray.length == 0) {
                            if (scope.placeholder == "") {
                                scope.hasPlaceholder = true;
                                scope.placeholder = placeholder;
                            } else {
                                scope.hasPlaceholder = false;
                                scope.placeholder = "";
                            }
                        }
                    };
                    $(element).click(function () {
                        $(element).children("input").focus();
                    });

                    $(element).children("input").focus(function () {
                        if (!focusLock) {
                            focusLock = true;
                            changgePlaceholder();
                            $window.addEventListener("keydown", deleteKeyCallback, true);
                            scope.disWatchData = scope.$watch("data", function (newValue) {
                                if (scope.dataChangeTimeout) {
                                    $timeout.cancel(scope.dataChangeTimeout);
                                }
                                scope.dataChangeTimeout = $timeout(function () {
                                    if (scope.nowPopup) {
                                        scope.nowPopup.then(function (popup) {
                                            popup.closeNow();
                                        });
                                    }
                                    $window.removeEventListener("keydown", union.keydownCallback, true);
                                    if (newValue != "") {
                                        $http.get(apiEndpoint + "normal-point", {params: {keyword: newValue}})
                                            .then(function (response) {
                                                var pointArray = response.data;
                                                scope.nowPopup = scope.showSelector({
                                                    templateUrl: "components/popup/point-selector.html",
                                                    controller: "PointSelectorController",
                                                    attachSide: "bottom",
                                                    event: {
                                                        type: "click",
                                                        currentTarget: element
                                                    },
                                                    align: "left",
                                                    offsetX: -8,
                                                    inputs: {
                                                        selected: 0,
                                                        pointArray: pointArray
                                                    }
                                                });
                                                scope.nowPopup.then(function (popup) {
                                                    return popup.close;
                                                }).then(function (result) {
                                                    if (result) {
                                                        addPoint(result);
                                                    }
                                                });
                                            }, function (error) {
                                                alert("未知错误");
                                                console.error(error);
                                            });
                                    }
                                }, 1000);
                            });
                        }
                    });

                    $(element).children("input").blur(function () {
                        if (scope.dataChangeTimeout) {
                            $timeout.cancel(scope.dataChangeTimeout);
                        }
                        focusLock = false;
                        changgePlaceholder();
                        $window.removeEventListener("keydown", deleteKeyCallback, true);
                        scope.disWatchData();
                    });
                }
            };
        }
    ]);
})();