/**
 * Created by Rex on 15/9/23.
 */
(function() {
    "use strict";

    keylolApp.controller("PostController", [
        "pageTitle", "$scope", "union",
        function(pageTitle, $scope, union) {
            pageTitle.set("邮政 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "邮政服务",
                    subHead: "Postal Services"
                },
                background: {
                    url: "//keylol.b0.upaiyun.com/04be114e21692aa38afe2e4d1bc605b6.png!profile.point.background"
                },
                defaultSum: {
                    text: "社区功能页面"
                }
            };
            union.timeline = {
                title: {
                    mainTitle: "邮政服务",
                    subTitle: "Postal Services"
                },
                rightButton: {
                    avatar: "assets/images/message-edit.png",
                    alt: "发送私信",
                    href: "test"
                },
                entries: [
                    {
                        types: ["私信"],
                        privateMesNum: {
                            number: 1,
                            hasNew: false
                        },
                        author: {
                            username: "crakyGALU",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "说起这个警匪死磕的话，相比正玩家们没有不知道那大名鼎鼎的CF啊不对CS，也就是《反恐精英（Counter-Strike）》，这款游戏的出现让警匪对殴的模式风靡全球，至今依然有大批玩家热衷于此，除此之外类似的游戏也有不少，例如《彩虹六号系列》，例如《收获日系列》等等，如今FPS界极其有影响力的战地系列也开始涉及此类题材，眼下BETA版本已经开始测试，本篇评测是根据测试版而来，所以并不代表游戏的最终品质！",
                    }
                ]
            };
        }
    ]);
})();