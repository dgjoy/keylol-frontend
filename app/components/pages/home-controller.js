(function () {
    "use strict";

    keylolApp.controller("HomeController", [
        "pageTitle", "$scope", "union", "$http", "notification", "window", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, window, utils, $timeout) {
            pageTitle.set("其乐 - 请无视游戏与艺术之间的空隙");
            $scope.union = union;
            var timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline"
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    text: "文",
                    clickAction: function () {
                        window.show({
                            templateUrl: "components/windows/editor.html",
                            controller: "EditorController",
                            inputs: {
                                options: null
                            }
                        });
                    }
                },
                noArticleText: {
                    main: "从你的游戏兴趣开始，慢慢搭建一条讯息轨道",
                    sub: "订阅一个据点后，其收到的文章投稿会推送到这里。"
                },
                hasExpand: true,
                loadingLock: true,
                loadAction: function (params, callback) {
                    $http.get(apiEndpoint + "article/subscription", {
                        params: params
                    }).then(function (response) {
                        callback(response);
                    }, function (response) {
                        notification.error("未知错误", response);
                    });
                },
                entries: []
            };


            $http.get(apiEndpoint + "article/subscription", {
                params: {
                    take: utils.timelineLoadCount
                }
            }).then(function (response) {
                var articleList = response.data;
                timeline.noMoreArticle = articleList.length < utils.timelineLoadCount;

                if (articleList.length > 0) {
                    var timelineTimeout;

                    /**
                     * 对于请求回来的文章列表做一系列处理并按照用户据点的文章格式储存在 union.timeline.entries 中
                     */
                    for (var i in articleList) {
                        var article = articleList[i];
                        var entry = {
                            types: [article.TypeName],
                            author: {
                                username: article.Author.UserName,
                                avatarUrl: article.Author.AvatarImage,
                                idCode: article.Author.IdCode
                            },
                            sequenceNumber: article.SequenceNumber,
                            sources: {},
                            voteForPoint: article.VoteForPoint,
                            datetime: article.PublishTime,
                            title: article.Title,
                            summary: article.Content,
                            hasBackground: false,
                            thumbnail: article.ThumbnailImage,
                            url: "/article/" + article.Author.IdCode + "/" + article.SequenceNumberForAuthor,
                            count: {
                                like: article.LikeCount,
                                comment: article.CommentCount
                            }
                        };
                        if (article.TimelineReason) {
                            switch (article.TimelineReason) {
                                case "Like":
                                    entry.sources.type = "like";
                                    entry.sources.userArray = [];
                                    if (article.LikeByUsers) {
                                        for (var j in article.LikeByUsers) {
                                            entry.sources.userArray.push({
                                                name: article.LikeByUsers[j].UserName,
                                                idCode: article.LikeByUsers[j].IdCode
                                            });
                                        }
                                    } else {
                                        entry.sources.userArray.push({
                                            name: union.$localStorage.user.UserName,
                                            idCode: "/user/" + union.$localStorage.user.IdCode
                                        });
                                    }
                                    break;
                                case "Point":
                                    if (article.AttachedPoints) {
                                        entry.sources.type = "point";
                                        entry.sources.points = article.AttachedPoints;
                                    } else {
                                        entry.sources = null;
                                    }
                                    break;
                                case "Publish":
                                    entry.sources.type = "publish";
                                    break;
                                default :
                                    break;
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
                } else {
                    $http.get(apiEndpoint + "normal-point/active").then(function (response) {
                        timeline.activePoints = response.data;
                        for (var i in timeline.activePoints) {
                            var point = timeline.activePoints[i];
                            timeline.activePoints[i].mainName = utils.getPointFirstName(point);
                            timeline.activePoints[i].subName = utils.getPointSecondName(point);
                            timeline.activePoints[i].type = utils.getPointType(point.Type);
                        }
                    }, function (response) {
                        notification.error("未知错误", response);
                    });
                    timeline.loadingLock = false;
                }

            }, function (response) {
                notification.error("未知错误", response);
                timeline.loadingLock = false;
            });

            union.timeline = timeline;
        }
    ]);
})();