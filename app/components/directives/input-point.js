(function () {
    "use strict";

    keylolApp.directive("inputPoint", [
        "$window", "union", "$timeout",
        function ($window, union, $timeout) {
            return {
                restrict: "E",
                templateUrl: "components/directives/input-point.html",
                scope: {
                },
                require: "ngModel",
                link: function (scope, element, attrs, ngModel) {
                    var focusLock = false;
                    scope.pointArray = [];
                    var placeholder = "最多可以同时推送至五个据点，每篇文章都会自动发布在你的个人据点中";
                    scope.placeholder = placeholder;
                    scope.hasPlaceholder = true;
                    var addPoint = function(result){
                        scope.pointArray.push({
                            title: result.mainTitle,
                            selected: false
                        });
                        scope.data = "";
                    };
                    var deleteSelectorPoint = function(index){
                        scope.pointArray.splice(index, 1);
                    };
                    var deleteKeyCallback = function(e){
                        scope.$apply(function(){
                            console.log(scope.data);
                            if(e.keyCode == 8 && scope.pointArray.length > 0 && scope.data == ""){
                                scope.pointArray.splice(-1, 1);
                            }
                        });
                    };
                    scope.selectPoint = function(index, $event){
                        console.log("aaa");
                        scope.pointArray[index].selected = true;
                        var keydownCallback = function(e){
                            scope.$apply(function(){
                                console.log("key");
                                scope.pointArray[index].selected = false;
                                if(e.keyCode == 8){
                                    deleteSelectorPoint(index);
                                }
                                $window.removeEventListener("click", clickCallback, true);
                                $window.removeEventListener("keydown", keydownCallback, true);
                                e.stopPropagation();
                                e.preventDefault();
                            });
                        };
                        var clickCallback = function(e){
                            scope.$apply(function() {
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

                    var changgePlaceholder = function(){
                        if(!scope.data && scope.pointArray.length == 0){
                            if(scope.placeholder == ""){
                                scope.hasPlaceholder = true;
                                scope.placeholder = placeholder;
                            }else{
                                scope.hasPlaceholder = false;
                                scope.placeholder = "";
                            }
                            console.log(scope.placeholder);
                        }
                    };
                    $(element).click(function(){
                        $(element).children("input").focus();
                    });

                    $(element).children("input").focus(function(){
                        if(!focusLock){
                            focusLock = true;
                            changgePlaceholder();
                            $window.addEventListener("keydown", deleteKeyCallback, true);
                            scope.disWatchData = scope.$watch("data", function(newValue){
                                if(scope.nowPopup){
                                    scope.nowPopup.then(function(popup){
                                        popup.closeNow();
                                    });
                                }
                                $window.removeEventListener("keydown",union.keydownCallback,true);
                                if(newValue != ""){
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
                                            selected: 0
                                        }
                                    });
                                    scope.nowPopup.then(function(popup){
                                        return popup.close;
                                    }).then(function (result) {
                                        if (result) {
                                            addPoint(result);
                                        }
                                    });
                                }
                            });
                        }
                    });

                    $(element).children("input").blur(function(e){
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