/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("AcknowledgementsController", [
        "pageTitle", "$scope", "union",
        function (pageTitle, $scope, union) {
            pageTitle.set("认同 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: "认同",
                    subHead: "Acknowledgement"
                },
                background: "//keylol.b0.upaiyun.com/04be114e21692aa38afe2e4d1bc605b6.png!profile.point.background",
                defaultSum: {
                    text: "文章/评论获得的认同"
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
                    mainTitle: "认同",
                    subTitle: "Acknowledgement"
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
                        text: "文章",
                        onClick: function () {
                            changeActive(this);
                        }
                    },
                    {
                        active: true,
                        text: "评论",
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
                        types: ["文章"],
                        isNew: true,
                        fromArticle: {
                            text: "扩展屏幕下，如何一个屏幕全补字数补字数补字数补字数补字数",
                            href: "test"
                        },
                        datetime: moment().subtract(4, "minutes"),
                        author: {
                            username: "ZenDay",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "认同你的文章"
                    },
                    {
                        types: ["文章"],
                        fromArticle: {
                            text: "扩展屏幕下，如何一个屏幕全补字数补字数补字数补字数补字数",
                            href: "test"
                        },
                        datetime: moment().subtract(4, "minutes"),
                        author: {
                            username: "Lee",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "认同你的文章"
                    },
                    {
                        types: ["评论"],
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
                        summary: "认同你的评论"
                    },
                    {
                        types: ["文章"],
                        fromArticle: {
                            text: "扩展屏幕下，如何一个屏幕全补字数补字数补字数补字数补字数",
                            href: "test"
                        },
                        datetime: moment().subtract(4, "minutes"),
                        author: {
                            username: "ZenDay",
                            avatarUrl: "assets/images/exit.svg"
                        },
                        summary: "认同你的文章"
                    }
                ]
            };
        }
    ]);
})();