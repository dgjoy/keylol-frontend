/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("CommentsController", [
        "pageTitle", "$scope", "union",
        function (pageTitle, $scope, union) {
            pageTitle.set("评论 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "评论",
                    subHead: "Comments"
                },
                background: "//keylol.b0.upaiyun.com/04be114e21692aa38afe2e4d1bc605b6.png!profile.point.background",
                defaultSum: {
                    text: "文章回复中的互动"
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
                    mainTitle: "评论",
                    subTitle: "Comments"
                },
                actions: [
                    {
                        active: true,
                        text: "全部",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: false,
                        text: "收到",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: false,
                        text: "发出",
                        onClick: function () {
                            changeActive(this);
                        }
                    }
                ],
                datetime: "inBlock",
                oneLine: true,
                hasDeleteButton: true,
                clickable: true,
                entries: [
                    {
                        types: ["收到"],
                        isNew: true,
                        fromArticle: {
                            fromComment: true,
                            text: "扩展屏幕下，如何一个屏幕全补字数补字数补字数补字数补字数",
                            href: "test"
                        },
                        datetime: moment().subtract(4, "minutes"),
                        author: {
                            username: "ZenDay",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "就好了全屏窗口化虽然切换方便，但是切出后人物失去控制，对于没有自动切是出暂停功能的游戏，又应该怎么做呢？",
                        commentTarget: {
                            type: "comment",
                            author: "Lee",
                            text: "记得貌似有方法可以配置双屏＋两套键鼠的，一套键鼠管一个屏幕。"
                        }
                    },
                    {
                        types: ["发出"],
                        fromArticle: {
                            fromComment: true,
                            text: "扩展屏幕下，如何一个屏幕全补字数补字数补字数补字数补字数",
                            href: "test"
                        },
                        datetime: moment().subtract(4, "minutes"),
                        author: {
                            username: "Lee",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "用虚拟机或者两套键盘鼠标吧，不然同一个光标共存在两个屏幕，我在一个屏幕里凸凸凸，另一个屏幕凹凹凹。。。。。",
                        commentTarget: {
                            type: "comment",
                            author: "Lee",
                            text: "记得貌似有方法可以配置双屏＋两套键鼠的，一套键鼠管一个屏幕。"
                        }
                    },
                    {
                        types: ["收到"],
                        fromArticle: {
                            fromComment: true,
                            text: "扩展屏幕下，如何一个屏幕全补字数补字数补字数补字数补字数",
                            href: "test"
                        },
                        datetime: moment().subtract(4, "minutes"),
                        author: {
                            username: "ZenDay",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "说起这个警匪死磕的话，相比正玩家们没有不知道那大名鼎鼎的CF啊不对CS，也就是《反恐精英（Counter-Strike）》，这款游戏的出现让警匪对殴的模式风靡全球，至今依然有大批玩家热衷于此，除此之外类似的游戏也有不少，例如《彩虹六号系列》，例如《收获日系列》等等，如今FPS界极其有影响力的战地系列也开始涉及此类题材，眼下BETA版本已经开始测试，本篇评测是根据测试版而来，所以并不代表游戏的最终品质！",
                        commentTarget: {
                            type: "comment",
                            author: "Lee",
                            text: "记得貌似有方法可以配置双屏＋两套键鼠的，一套键鼠管一个屏幕。"
                        }
                    },
                    {
                        types: ["收到"],
                        fromArticle: {
                            fromComment: true,
                            text: "扩展屏幕下，如何一个屏幕全补字数补字数补字数补字数补字数",
                            href: "test"
                        },
                        datetime: moment().subtract(4, "minutes"),
                        author: {
                            username: "ZenDay",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "说起这个警匪死磕的话，相比正玩家们没有不知道那大名鼎鼎的CF啊不对CS，也就是《反恐精英（Counter-Strike）》，这款游戏的出现让警匪对殴的模式风靡全球，至今依然有大批玩家热衷于此，除此之外类似的游戏也有不少，例如《彩虹六号系列》，例如《收获日系列》等等，如今FPS界极其有影响力的战地系列也开始涉及此类题材，眼下BETA版本已经开始测试，本篇评测是根据测试版而来，所以并不代表游戏的最终品质！",
                        commentTarget: {
                            type: "comment",
                            author: "Lee",
                            text: "记得貌似有方法可以配置双屏＋两套键鼠的，一套键鼠管一个屏幕。"
                        }
                    }
                ]
            };
        }
    ]);
})();