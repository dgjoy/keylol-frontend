(function() {
    "use strict";

    keylolApp.controller("PointController", [
        "pageTitle", "$scope", "union",
		function(pageTitle, $scope, union) {
            pageTitle.set("据点 - 其乐");
            union.summary = {
                actions: [
                    {
                        text: "编辑据点"
                    },
                    {
                        text: "已订阅",
                        extraClass: [
                            "subscribed"
                        ]
                    }
                ],
                head: {
                    mainHead: "Counter-Strike: Global Offensive",
                    subHead: "反恐精英：全球攻势"
                },
                avatar: {
                    src: "assets/images/exit.svg"
                },
                background: {
                    url: "//keylol.b0.upaiyun.com/5a3e206aab9decee842a3ea88ac2a312.jpg!profile.point.background"
                },
                pointSum: {
                    type: "游戏",
                    readerNum: 157,
                    articleNum: 48
                }
            };
		}
    ]);
})();