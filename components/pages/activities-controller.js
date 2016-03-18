/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("ActivitiesController", [
        "pageTitle", "$scope", "union", "$http", "notification", "utils", "$timeout", "$location",
        function (pageTitle, $scope, union, $http, notification, utils, $timeout, $location) {
            if(!union.$localStorage.user){
                $location.url("/");
                return;
            }
            pageTitle.set("动态 - 其乐");
            $scope.union = union;
            function changeActive(activeObject) {
                var actions = timeline.actions;
                for (var i = 0; i < actions.length; i++) {
                    actions[i].active = false;
                }
                activeObject.active = true;
            }

            var timeline = {
                title: {
                    mainTitle: "动态",
                    subTitle: "Activities"
                },
                actions: [
                    {
                        active: true,
                        text: "全部",
                        onClick: function () {
                            if (!this.active) {
                                changeActive(this);
                                getLike("All");
                            }
                        }
                    },
                    {
                        active: false,
                        text: "文章",
                        onClick: function () {
                            if (!this.active) {
                                changeActive(this);
                                getLike("ArticleLike");
                            }
                        }
                    },
                    {
                        active: false,
                        text: "评论",
                        onClick: function () {
                            if (!this.active) {
                                changeActive(this);
                                getLike("CommentLike");
                            }
                        }
                    }
                ],
                loadAction: function () {
                    timeline.loadingLock = true;
                    if (timeline.actions[0].active) {
                        getLike("All", timeline.entries.length);
                    } else if (timeline.actions[1].active) {
                        getLike("ArticleLike", timeline.entries.length);
                    } else {
                        getLike("CommentLike", timeline.entries.length);
                    }
                },
                loadingLock: true,
                notArticle: true,
                hasDeleteButton: true,
                clickable: true,
                entries: []
            };
            getLike("All");

            function getLike(type, skip) {
                if (!skip) {
                    timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "like/my", {
                    params: {
                        type: type,
                        skip: skip,
                        take: utils.timelineLoadCount
                    }
                }).then(function (response) {
                    timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                    var timelineTimeout;
                    for (var i in response.data) {
                        var like = response.data[i];
                        var entry = {
                            isNew: !like.ReadByTargetUser,
                            fromArticle: {
                                id: like.Article.Id,
                                text: like.Article.Title,
                                href: "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor
                            },
                            datetime: like.Time,
                            hasBackground: true,
                            background: "keylol://0abeafd8e4c049bce860686bc4c04829.jpg",
                            author: {
                                username: like.Operator.UserName,
                                avatarUrl: like.Operator.AvatarImage,
                                idCode: like.Operator.IdCode
                            },
                            id: like.Id
                        };
                        if (like.Comment) {
                            entry.commentId = like.Comment.Id;
                            entry.types = ["评论"];
                            entry.fromArticle.fromComment = true;
                            entry.summary = "认可你的评论";
                            entry.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor + "#" + like.Comment.SequenceNumberForArticle;
                        } else {
                            entry.types = ["文章"];
                            entry.summary = "认可你的文章";
                            entry.url = "article/" + like.Article.AuthorIdCode + "/" + like.Article.SequenceNumberForAuthor;
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
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                    timeline.loadingLock = false;
                });
            }

            union.timeline = timeline;
        }
    ]);
})();