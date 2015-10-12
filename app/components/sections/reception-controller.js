(function () {
    "use strict";

    keylolApp.controller("ReceptionController", [
        "$scope",
        function ($scope) {
            $scope.quickLinks = [
                {
                    name: "League of Legends",
                    url: "test"
                },
                {
                    name: "Counter-Strike: Global Offense",
                    url: "test"
                },
                {
                    name: "战地：硬仗",
                    url: "test"
                }
            ];
            $scope.recentLinks = [
                {
                    name: "第一人称射击",
                    url: "test"
                },
                {
                    name: "即时战略",
                    url: "test"
                },
                {
                    name: "Life is Strange",
                    url: "test"
                },
                {
                    name: "桌面游戏",
                    url: "test"
                },
                {
                    name: "This war of mine",
                    url: "test"
                }
            ];
            $scope.testHover = function ($event) {
                $scope.showTestHover({
                    templateUrl: "components/popup/point-preview-card.html",
                    controller: "PointPreviewCardController",
                    event: $event,
                    attachSide: "bottom",
                    align: "left",
                    inputs: {
                        data: {
                            action: {
                                text: "已订阅",
                                extraClass: "subscribed"
                            },
                            head: {
                                mainHead: "Counter-Strike: Global Offensive",
                                subHead: "反恐精英：全球攻势"
                            },
                            avatar: "assets/images/exit.svg",
                            background: "//keylol.b0.upaiyun.com/5a3e206aab9decee842a3ea88ac2a312.jpg!point.card.background",
                            pointSum: {
                                type: "游戏",
                                readerNum: 157,
                                articleNum: 48
                            }
                        }
                    }
                });
            };
        }
    ]);
})();