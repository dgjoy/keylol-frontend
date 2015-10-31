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
                    scope.pointArray = [];
                    var addPoint = function (result) {
                        var hasBeenExist = false;
                        for (var i in scope.pointArray) {
                            if (scope.pointArray[i].id === result.Id) {
                                hasBeenExist = true
                            }
                        }
                        if (!hasBeenExist) {
                            scope.pointArray.push({
                                title: result[result.PreferedName + "Name"],
                                selected: false,
                                id: result.Id
                            });
                        }
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
                    scope.selectPoint = function (index) {
                        scope.pointArray[index].selected = true;
                        var keydownCallback = function (e) {
                            scope.$apply(function () {
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
                                scope.pointArray[index].selected = false;
                                $window.removeEventListener("click", clickCallback, true);
                                $window.removeEventListener("keydown", keydownCallback, true);
                            });
                        };
                        $window.addEventListener("click", clickCallback, true);
                        $window.addEventListener("keydown", keydownCallback, true);
                    };

                    var $input = element.find(".input");

                    element.click(function (e) {
                        if (e.target === $input[0] || $(e.target).is(element.find(".point-title"))) return;
                        element.children("input").focus();
                    });

                    $input.focus(function () {
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
                                if (newValue) {
                                    $http.get(apiEndpoint + "normal-point/keyword/" + encodeURIComponent(newValue))
                                        .then(function (response) {
                                            var pointArray = response.data;
                                            if (pointArray.length) {
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
                                            }
                                        });
                                }
                            }, 200);
                        });
                    });

                    $input.blur(function () {
                        if (scope.dataChangeTimeout) {
                            $timeout.cancel(scope.dataChangeTimeout);
                        }
                        $window.removeEventListener("keydown", deleteKeyCallback, true);
                        scope.disWatchData();
                    });
                }
            };
        }
    ]);
})();