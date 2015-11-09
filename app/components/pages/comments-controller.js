/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("CommentsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, utils, $timeout) {
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
                loadAction: function () {
                    union.timeline.loadingLock = true;
                    if (union.timeline.actions[0].active) {
                        getReceiveComments(union.timeline.entries.length);
                    } else {
                        getSendComments(union.timeline.entries.length);
                    }
                },
                datetime: "inBlock",
                oneLine: true,
                clickable: true,
                loadingLock: true,
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

            function getSendComments(skip) {
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
                        (function(entry){
                            if(!timelineTimeout){
                                union.timeline.entries.push(entry);
                                timelineTimeout = $timeout(function(){}, 100);
                            }else {
                                timelineTimeout = timelineTimeout.then(function(){
                                    union.timeline.entries.push(entry);
                                    return $timeout(function(){}, 100);
                                });
                            }
                        })(entry);
                    }
                    if(timelineTimeout){
                        timelineTimeout.then(function(){
                            union.timeline.loadingLock = false;
                        });
                    }else {
                        union.timeline.loadingLock = false;
                    }
                }, function (error) {
                    notification.error("未知错误", error);
                    union.timeline.loadingLock = false;
                });
            }

            function getReceiveComments(skip) {
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
                        (function(entry){
                            if(!timelineTimeout){
                                union.timeline.entries.push(entry);
                                timelineTimeout = $timeout(function(){}, 100);
                            }else {
                                timelineTimeout = timelineTimeout.then(function(){
                                    union.timeline.entries.push(entry);
                                    return $timeout(function(){}, 100);
                                });
                            }
                        })(entry);
                    }
                    if(timelineTimeout){
                        timelineTimeout.then(function(){
                            union.timeline.loadingLock = false;
                        });
                    }else {
                        union.timeline.loadingLock = false;
                    }
                }, function (error) {
                    notification.error("未知错误", error);
                    union.timeline.loadingLock = false;
                });
            }
        }
    ]);
})();