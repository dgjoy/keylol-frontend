(function () {
    "use strict";

    keylolApp.controller("PointController", [
        "pageTitle", "$scope", "union", "$routeParams", "$http", "utils", "notification", "window",
        function (pageTitle, $scope, union, $routeParams, $http, utils, notification, window) {
            /**
             * 初始化union的一些属性
             */
            $scope.isInPoint = true;
            union.summary = {};
            union.user = {};
            union.timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline"
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    href: "test",
                    text: "文",
                    clickAction: function () {
                        window.show({
                            templateUrl: "components/windows/editor.html",
                            controller: "EditorController",
                            inputs: {
                                vm: null
                            }
                        });
                    }
                },
                datetime: "outBlock",
                hasExpand: true,
                noMoreArticle: true,
                entries: []
            };
            union.point = {};

            if ($routeParams.userIdCode) {
                /**
                 * 定义在 timeline 中调用的加载函数
                 * @param params 加载时请求的参数
                 * @param callback 加载后的回调
                 */
                union.timeline.loadAction = function (params, callback) {
                    $http.get(apiEndpoint + "article/user/" + $routeParams.userIdCode, {
                        params: params
                    }).then(function (response) {
                        callback(response);
                    }, function (error) {
                        notification.error("未知错误");
                        console.error(error);
                    });
                };

                /**
                 * 请求用户信息，用户的信息会被存储在 union.user 里。
                 * 同时对用户部分信息做处理后，用于 summary 中。
                 */
                $http.get(apiEndpoint + "user/" + $routeParams.userIdCode, {
                    params: {
                        includeStats: true,
                        idType: "IdCode",
                        includeProfilePointBackgroundImage: true,
                        includeSubscribed: true
                    }
                }).then(function (response) {

                    var user = response.data;
                    var summary = {
                        head: {
                            mainHead: user.UserName,
                            subHead: user.GamerTag
                        },
                        avatar: user.AvatarImage,
                        background: user.ProfilePointBackgroundImage,
                        pointSum: {
                            type: "个人",
                            readerNum: user.SubscriberCount,
                            articleNum: user.ArticleCount
                        },
                        id: user.Id
                    };
                    if (user.IdCode != union.$localStorage.user.IdCode) {
                        union.summary.subscribed = user.Subscribed;
                    }
                    utils.addRecentBroswe("ProfilePoint", user.UserName, user.IdCode);
                    pageTitle.set(user.UserName + " - 其乐");
                    $.extend(union.user, user);
                    $.extend(union.summary, summary);


                    /**
                     * 请求文章列表，放于请求用户信息之后
                     */
                    $http.get(apiEndpoint + "article/user/" + $routeParams.userIdCode, {
                        params: {
                            idType: "IdCode",
                            take: timeLineLoadCount
                        }
                    }).then(function (response) {
                        var articleList = response.data;
                        union.timeline.noMoreArticle = articleList.length < timeLineLoadCount;

                        /**
                         * 对于请求回来的文章列表做一系列处理并按照用户据点的文章格式储存在 union.timeline.entries 中
                         */
                        for (var i in articleList) {
                            var article = articleList[i];
                            if (!article.Author) {
                                article.Author = union.user;
                            }
                            var entry = {
                                types: [article.TypeName],
                                author: {
                                    username: article.Author.UserName,
                                    avatarUrl: article.Author.AvatarImage,
                                    idCode: article.Author.IdCode
                                },
                                sequenceNumber: article.SequenceNumber,
                                sources: {},
                                datetime: article.PublishTime,
                                title: article.Title,
                                summary: article.Content,
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
                                                idCode: union.$localStorage.user.IdCode
                                            });
                                        }
                                        break;
                                    case "Point":
                                        entry.sources.type = "point";
                                        entry.sources.points = [];
                                        for (var j in article.AttachedPoints) {
                                            entry.sources.points.push({
                                                name: article.AttachedPoints[j][article.AttachedPoints[j].PreferedName + "Name"],
                                                idCode: article.AttachedPoints[j].IdCode
                                            });
                                        }
                                        break;
                                    case "Publish":
                                        entry.sources.type = "publish";
                                        break;
                                    default :
                                        break;
                                }
                            }
                            union.timeline.entries.push(entry);
                        }
                    }, function (error) {
                        notification.error("未知错误", error);
                    });
                }, function (error) {
                    notification.error("未知错误", error);
                });

            }

            if ($routeParams.pointIdCode) {
                $scope.hasVote = true;
                /**
                 * 定义在 timeline 中调用的加载函数
                 * @param params 加载时请求的参数
                 * @param callback 加载后的回调
                 */
                union.timeline.loadAction = function (params, callback) {
                    $http.get(apiEndpoint + "article/point/" + $routeParams.pointIdCode, {
                        params: params
                    }).then(function (response) {
                        callback(response);
                    }, function (error) {
                        notification.error("未知错误", error);
                    });
                };

                /**
                 * 请求据点信息，储存在 union.point 中。
                 * 以 summary 的格式对于 union.point 做一些处理, 存储到 union.summary 中。
                 */
                $http.get(apiEndpoint + "normal-point/" + $routeParams.pointIdCode, {
                    params: {
                        includeStats: true,
                        includeVotes: true,
                        includeSubscribed: true,
                        includeAssociated: true,
                        idType: "IdCode"
                    }
                }).then(function (response) {

                    var point = response.data;
                    var summary = {
                        head: {},
                        avatar: point.AvatarImage,
                        subscribed: point.Subscribed,
                        background: point.BackgroundImage,
                        pointSum: {
                            type: utils.getPointType(point.Type),
                            readerNum: point.SubscriberCount,
                            articleNum: point.ArticleCount
                        },
                        id: point.Id
                    };

                    if (point.PreferedName == "Chinese") {
                        point.mainName = point.ChineseName;
                        summary.head.mainHead = point.ChineseName;
                        summary.head.subHead = point.EnglishName;
                    } else {
                        point.mainName = point.EnglishName;
                        summary.head.mainHead = point.EnglishName;
                        summary.head.subHead = point.ChineseName;
                    }
                    pageTitle.set(point.mainName + " - 其乐");
                    point.votePercent = (point.PositiveArticleCount * 10 / (point.PositiveArticleCount + point.NegativeArticleCount)).toFixed(1);
                    point.voteCircles = [{}, {}, {}, {}, {}];
                    if (point.votePercent >= 8) {
                        for (var i in point.voteCircles) {
                            point.voteCircles[i].type = "awesome";
                        }
                    } else if (point.votePercent >= 6) {
                        for (var i = 0; i < 4; i++) {
                            point.voteCircles[i].type = "good";
                        }
                    } else if (point.votePercent >= 4) {
                        for (var i = 0; i < 3; i++) {
                            point.voteCircles[i].type = "not-bad";
                        }
                    } else if (point.votePercent >= 2) {
                        for (var i = 0; i < 2; i++) {
                            point.voteCircles[i].type = "bad";
                        }
                    } else {
                        point.voteCircles[0].type = "terrible"
                    }

                    utils.addRecentBroswe("NormalPoint", point.mainName, point.IdCode);
                    $.extend(union.point, point);
                    $.extend(union.summary, summary);

                }, function (error) {
                    notification.error("未知错误", error);
                });

                /**
                 * 请求据点对应的文章
                 */
                $http.get(apiEndpoint + "article/point/" + $routeParams.pointIdCode, {
                    params: {
                        idType: "IdCode",
                        take: timeLineLoadCount
                    }
                }).then(function (response) {
                    var articleList = response.data;
                    union.timeline.noMoreArticle = articleList.length < timeLineLoadCount;

                    for (var i in articleList) {
                        var article = articleList[i];
                        union.timeline.entries.push({
                            types: [article.TypeName],
                            author: {
                                username: article.Author.UserName,
                                avatarUrl: article.Author.AvatarImage,
                                idCode: article.Author.IdCode
                            },
                            sequenceNumber: article.SequenceNumber,
                            datetime: article.PublishTime,
                            title: article.Title,
                            summary: article.Content,
                            thumbnail: article.ThumbnailImage,
                            url: "/article/" + article.Author.IdCode + "/" + article.SequenceNumberForAuthor,
                            count: {
                                like: article.LikeCount,
                                comment: article.CommentCount
                            }
                        });
                    }
                }, function (error) {
                    notification.error("未知错误", error);
                });
            }
        }
    ]);
})();