/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("CommentsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, utils, $timeout) {
            pageTitle.set("评论 - 其乐");
            $scope.union = union;

            var timeline = {
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
                loadAction: function () {
                    timeline.loadingLock = true;
                    if (timeline.actions[0].active) {
                        getReceiveComments(timeline.entries.length);
                    } else {
                        getSendComments(timeline.entries.length);
                    }
                },
                notArticle: true,
                clickable: true,
                loadingLock: true,
                entries: []
            };
            getReceiveComments();

            function changeActive(activeObject) {
                var actions = timeline.actions;
                for (var i = 0; i < actions.length; i++) {
                    actions[i].active = false;
                }
                activeObject.active = true;
            }

            function getSendComments(skip) {
                if (!skip) {
                    timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "comment/my", {
                    params: {
                        type: "Sent",
                        skip: skip,
                        take: utils.timelineLoadCount
                    }
                }).then(function (response) {
                    timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                    var timelineTimeout;
                    for (var i in response.data) {
                        var comment = response.data[i];
                        var entry = {
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
                            hasBackground: true,
                            background: "keylol://672a1bab71b9af43215d252471a893e0.jpg",
                            summary: comment.Content,
                            url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.SequenceNumberForArticle
                        };
                        if (comment.ReplyToComment && comment.ReplyToUser) {
                            entry.commentTarget = {
                                type: "comment",
                                author: {
                                    username: comment.ReplyToUser.UserName,
                                    idCode: comment.ReplyToUser.IdCode
                                },
                                text: comment.ReplyToComment.Content,
                                url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.ReplyToComment.SequenceNumberForArticle
                            }
                        }
                        timeline.entries.push(entry);
                        (function (entry) {
                            $timeout(function() {
                                if (!timelineTimeout) {
                                    entry.show = true;
                                    timelineTimeout = $timeout(function () {
                                    }, utils.timelineShowDelay);
                                } else {
                                    timelineTimeout = timelineTimeout.then(function () {
                                        entry.show = true;
                                        return $timeout(function () {
                                        }, utils.timelineShowDelay);
                                    });
                                }
                            });
                        })(entry);
                    }
                    if (timelineTimeout) {
                        timelineTimeout.then(function () {
                            timeline.loadingLock = false;
                        });
                    } else {
                        timeline.loadingLock = false;
                    }
                }, function (response) {
                    notification.error("未知错误", response);
                    timeline.loadingLock = false;
                });
            }

            function getReceiveComments(skip) {
                if (!skip) {
                    timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "comment/my", {
                    params: {
                        skip: skip,
                        take: utils.timelineLoadCount
                    }
                }).then(function (response) {
                    timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                    var timelineTimeout;
                    for (var i in response.data) {
                        var comment = response.data[i];
                        var entry = {
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
                            hasBackground: true,
                            background: "keylol://672a1bab71b9af43215d252471a893e0.jpg",
                            summary: comment.Content,
                            url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.SequenceNumberForArticle
                        };
                        if (comment.ReplyToComment) {
                            entry.commentTarget = {
                                type: "comment",
                                author: {
                                    username: union.$localStorage.user.UserName,
                                    idCode: union.$localStorage.user.IdCode
                                },
                                text: comment.ReplyToComment.Content,
                                url: "article/" + comment.Article.AuthorIdCode + "/" + comment.Article.SequenceNumberForAuthor + "#" + comment.ReplyToComment.SequenceNumberForArticle
                            }
                        }
                        timeline.entries.push(entry);
                        (function (entry) {
                            $timeout(function() {
                                if (!timelineTimeout) {
                                    entry.show = true;
                                    timelineTimeout = $timeout(function () {
                                    }, utils.timelineShowDelay);
                                } else {
                                    timelineTimeout = timelineTimeout.then(function () {
                                        entry.show = true;
                                        return $timeout(function () {
                                        }, utils.timelineShowDelay);
                                    });
                                }
                            });
                        })(entry);
                    }
                    if (timelineTimeout) {
                        timelineTimeout.then(function () {
                            timeline.loadingLock = false;
                        });
                    } else {
                        timeline.loadingLock = false;
                    }
                }, function (response) {
                    notification.error("未知错误", response);
                    timeline.loadingLock = false;
                });
            }

            union.timeline = timeline;
            union.summary = {
                head: {
                    mainHead: "评论",
                    subHead: "Comments"
                },
                background: "keylol://672a1bab71b9af43215d252471a893e0.jpg",
                defaultSum: {
                    text: "文章回复中的互动"
                }
            };
        }
    ]);
})();