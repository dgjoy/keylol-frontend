/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("CommentsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "utils",
        function (pageTitle, $scope, union, $http, notification, utils) {
            pageTitle.set("评论 - 其乐");
            union.summary = {
                head: {
                    mainHead: "评论",
                    subHead: "Comments"
                },
                background: "672a1bab71b9af43215d252471a893e0.jpg",
                defaultSum: {
                    text: "文章回复中的互动"
                }
            };

            union.timeline = {
                title: {
                    mainTitle: "评论",
                    subTitle: "Comments"
                },
                actions: [
                    {
                        active: true,
                        text: "收到",
                        onClick: function () {
                            if (!this.active) {
                                changeActive(this);
                                getReceiveComments();
                            }
                        }
                    },
                    {
                        active: false,
                        text: "发出",
                        onClick: function () {
                            if (!this.active) {
                                changeActive(this);
                                getSendComments();
                            }
                        }
                    }
                ],
                loadAction: function (callback) {
                    if (union.timeline.actions[0].active) {
                        getReceiveComments(union.timeline.entries.length, callback);
                    } else {
                        getSendComments(union.timeline.entries.length, callback);
                    }
                },
                datetime: "inBlock",
                oneLine: true,
                clickable: true,
                noMoreArticle: true,
                entries: []
            };
            getReceiveComments();

            function changeActive(activeObject) {
                var actions = union.timeline.actions;
                for (var i = 0; i < actions.length; i++) {
                    actions[i].active = false;
                }
                activeObject.active = true;
            }

            function getSendComments(skip, callback) {
                if (!skip) {
                    union.timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "comment/my", {
                    params: {
                        type: "Sent",
                        skip: skip,
                        take: utils.timelineLoadCount
                    }
                }).then(function (response) {
                    union.timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                    for (var i in response.data) {
                        var comment = response.data[i];
                        var result = {
                            types: ["发出"],
                            fromArticle: {
                                fromComment: true,
                                text: comment.Article.Title,
                                href: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor
                            },
                            datetime: comment.PublishTime,
                            author: {
                                username: union.$localStorage.user.UserName,
                                avatarUrl: union.$localStorage.user.AvatarImage,
                                idCode: union.$localStorage.user.IdCode
                            },
                            summary: comment.Content,
                            url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.SequenceNumberForArticle
                        };
                        if (comment.ReplyToComment && comment.ReplyToUser) {
                            result.commentTarget = {
                                type: "comment",
                                author: {
                                    username: comment.ReplyToUser.UserName,
                                    idCode: comment.ReplyToUser.IdCode
                                },
                                text: comment.ReplyToComment.Content,
                                url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.ReplyToComment.SequenceNumberForArticle
                            }
                        }
                        union.timeline.entries.push(result);
                    }
                }, function (error) {
                    notification.error("未知错误", error);
                }).finally(function () {
                    if (callback) {
                        callback();
                    }
                });
            }

            function getReceiveComments(skip, callback) {
                if (!skip) {
                    union.timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "comment/my", {
                    params: {
                        skip: skip,
                        take: utils.timelineLoadCount
                    }
                }).then(function (response) {
                    union.timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                    for (var i in response.data) {
                        var comment = response.data[i];
                        var result = {
                            types: ["收到"],
                            isNew: !comment.ReadByTargetUser,
                            fromArticle: {
                                fromComment: true,
                                text: comment.Article.Title,
                                href: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor
                            },
                            datetime: comment.PublishTime,
                            author: {
                                username: comment.Commentator.UserName,
                                avatarUrl: comment.Commentator.AvatarImage,
                                idCode: comment.Commentator.IdCode
                            },
                            summary: comment.Content,
                            url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.SequenceNumberForArticle
                        };
                        if (comment.ReplyToComment) {
                            result.commentTarget = {
                                type: "comment",
                                author: {
                                    username: union.$localStorage.user.UserName,
                                    idCode: union.$localStorage.user.IdCode
                                },
                                text: comment.ReplyToComment.Content,
                                url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.ReplyToComment.SequenceNumberForArticle
                            }
                        }
                        union.timeline.entries.push(result);
                    }
                }, function (error) {
                    notification.error("未知错误", error);
                }).finally(function () {
                    if (callback) {
                        callback();
                    }
                });
            }
        }
    ]);
})();