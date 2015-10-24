/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("SearchResultsController", [
        "pageTitle", "$scope", "union",
        function (pageTitle, $scope, union) {
            pageTitle.set("搜索结果 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "cs",
                    subHead: "的搜索结果"
                },
                background: "//keylol.b0.upaiyun.com/04be114e21692aa38afe2e4d1bc605b6.png!profile.point.background",
                defaultSum: {
                    text: "找到 3 个符合的项目"
                }
            };
            function changeActive(activeObject) {
                var actions = union.timeline.actions;
                for (var i = 0; i < actions.length; i++) {
                    actions[i].active = false;
                }
                activeObject.active = true;
            }

            union.timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                actions: [
                    {
                        active: false,
                        text: "据点",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: false,
                        text: "文章",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: false,
                        text: "用户",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: true,
                        text: "全站",
                        onClick: function () {
                            changeActive(this);
                        }
                    }
                ],
                datetime: "outBlock",
                entries: [
                    {
                        types: ["评测"],
                        sources: [
                            {
                                name: "战地：硬仗",
                                url: "test"
                            },
                            {
                                name: "战地系列",
                                url: "test"
                            }
                        ],
                        author: {
                            username: "crakyGALU",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        datetime: moment().subtract(1, "seconds"),
                        title: "代工就是不如原厂：这硬仗真的是打的艰辛",
                        summary: "说起这个警匪死磕的话，相比正玩家们没有不知道那大名鼎鼎的CF啊不对CS，也就是《反恐精英（Counter-Strike）》，这款游戏的出现让警匪对殴的模式风靡全球，至今依然有大批玩家热衷于此，除此之外类似的游戏也有不少，例如《彩虹六号系列》，例如《收获日系列》等等，如今FPS界极其有影响力的战地系列也开始涉及此类题材，眼下BETA版本已经开始测试，本篇评测是根据测试版而来，所以并不代表游戏的最终品质！",
                        url: "test",
                        thumbnail: "//keylol.b0.upaiyun.com/ffc1c0643b2857caa83ec2cf254e510f.jpg!timeline.thumbnail",
                        count: {
                            like: 666,
                            comment: 222
                        }
                    },
                    {
                        types: ["用户"],
                        pointInfo: {
                            reader: 157,
                            article: 48
                        },
                        pointAvatar: "assets/images/exit.svg",
                        isUser: true,
                        title: "css",
                        summary: "说了多少次是起源不是前端",
                        url: "test",
                        actions: [
                            {
                                text: "订阅据点"
                            }
                        ]
                    },
                    {
                        types: ["游戏"],
                        pointInfo: {
                            reader: 157,
                            article: 48
                        },
                        pointAvatar: "assets/images/exit.svg",
                        title: "Counter-Strike: Global Offensive",
                        summary: "反恐精英：全球攻势",
                        url: "test",
                        actions: [
                            {
                                text: "已订阅",
                                extraClass: "subscribed"
                            }
                        ]
                    }
                ]
            };
        }
    ]);
})();