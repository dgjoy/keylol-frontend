(function () {
    "use strict";

    keylolApp.controller("PointPreviewCardController", [
        "$scope", "data", "$timeout",
        function ($scope, data, $timeout) {
            $scope.loading = true;
            $timeout(function () {
                $scope.data = {
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
                };
                $scope.loading = false;
            }, data * 1000);
        }
    ]);
})();