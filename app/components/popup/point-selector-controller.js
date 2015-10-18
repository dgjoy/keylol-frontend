(function () {
    "use strict";

    keylolApp.controller("PointSelectorController", [
        "$scope", "$window", "close", "union",
        function ($scope, $window, close, union) {
            var selected = 0;
            $scope.pointArray = [
                {
                    avatar: "assets/images/exit.svg",
                    type: "游戏",
                    mainTitle: "去月球去月球去月球去月球去月球去月球去月球去月球去月球",
                    subTitle: "To the Moon",
                    selected: false
                },
                {
                    avatar: "assets/images/exit.svg",
                    type: "游戏",
                    mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                    subTitle: "刀塔",
                    selected: false
                }
            ];
            $scope.pointArray[selected].selected = true;
            $scope.changeSelector = function(newSelected){
                $scope.pointArray[selected].selected = false;
                selected = newSelected;
                $scope.pointArray[newSelected].selected = true;
            };
            $scope.selectPoint = function($event){
                console.log("meaning");
                close($scope.pointArray[selected]);
            };
            union.keydownCallback = function(e){
                $scope.$apply(function(){
                    if(e.keyCode == 40){
                        if(selected < $scope.pointArray.length-1){
                            $scope.changeSelector(selected+1);
                        }else{
                            $scope.changeSelector(0);
                        }
                    }else if(e.keyCode == 38){
                        if(selected > 0){
                            $scope.changeSelector(selected-1);
                        }else {
                            $scope.changeSelector($scope.pointArray.length - 1);
                        }
                    }else if(e.keyCode == 13){
                        $scope.selectPoint(e);
                    }
                });
            };
            $window.addEventListener("keydown",union.keydownCallback,true);
        }
    ]);
})();