(function () {
    "use strict";

    keylolApp.controller("SearchSelectorController", [
        "$scope", "union", "$location", "onSearching", "$timeout",
        function ($scope, union, $location, onSearching, $timeout) {
            $scope.onSearching = onSearching;
            $scope.resultArray = [
                {
                    avatar: "assets/images/exit.svg",
                    isUser: true,
                    mainTitle: "去月球去月球去月球去月球去月球去月球去月球去月球去月球",
                    subTitle: "To the Moon",
                    url: "test"
                },
                {
                    avatar: "assets/images/exit.svg",
                    type: "游戏",
                    mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                    subTitle: "刀塔",
                    url: "test"
                },
                {
                    avatar: "assets/images/exit.svg",
                    type: "游戏",
                    mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                    subTitle: "刀塔",
                    url: "test"
                },
                {
                    avatar: "assets/images/exit.svg",
                    type: "游戏",
                    mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                    subTitle: "刀塔",
                    url: "test"
                },
                {
                    avatar: "assets/images/exit.svg",
                    type: "游戏",
                    mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                    subTitle: "刀塔",
                    url: "test"
                }
            ];
            $scope.filterArray = union.searchFilter;
            $scope.changeFilter = function($index){
                if(!$scope.filterArray[$index].active){
                    for(var i in $scope.filterArray){
                        $scope.filterArray[i].active = false;
                    }
                    $scope.filterArray[$index].active = true;
                }
                    $scope.resultArray = [
                        {
                            avatar: "assets/images/exit.svg",
                            isUser: true,
                            mainTitle: "去月球去月球去月球去月球去月球去月球去月球去月球去月球",
                            subTitle: "To the Moon",
                            url: "test"
                        },
                        {
                            avatar: "assets/images/exit.svg",
                            type: "游戏",
                            mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                            subTitle: "刀塔",
                            url: "test"
                        },
                        {
                            avatar: "assets/images/exit.svg",
                            type: "游戏",
                            mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                            subTitle: "刀塔",
                            url: "test"
                        },
                        {
                            avatar: "assets/images/exit.svg",
                            type: "游戏",
                            mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                            subTitle: "刀塔",
                            url: "test"
                        },
                        {
                            avatar: "assets/images/exit.svg",
                            type: "游戏",
                            mainTitle: "Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2Dota2",
                            subTitle: "刀塔",
                            url: "test"
                        }
                    ];
            };
            $scope.jumpTo = function(url){
                $location.url(url);
            }
        }
    ]);
})();