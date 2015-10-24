(function () {
    "use strict";

    keylolApp.controller("RelatedPointsController", [
        "$scope",
        function ($scope) {
            $scope.recommendedPoints = [
                {
                    name: "Counter-Strike Global Offensive",
                    subName: "反恐精英：全球攻势",
                    type: "游戏",
                    url: "test"
                },
                {
                    name: "Dota 2",
                    subName: "刀塔",
                    type: "游戏",
                    url: "test"
                },
                {
                    name: "MOBA",
                    subName: "多人在线战术竞技游戏",
                    type: "类型",
                    url: "test"
                },
                {
                    name: "Steam",
                    subName: "蒸汽",
                    type: "平台",
                    url: "test"
                },
                {
                    name: "Insurgency",
                    subName: "叛变",
                    type: "游戏",
                    url: "test"
                }
            ];
        }
    ]);
})();