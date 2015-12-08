/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("SearchResultsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "$routeParams", "$location", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, $routeParams, $location, utils, $timeout) {
            $scope.searchExist = true;
            $scope.union = union;
            if (!$routeParams.searchType || !$routeParams.keyword) {
                $scope.searchExist = false;
            }
            pageTitle.set($routeParams.keyword + " 的搜索结果 - 其乐");
            var summary = {
                actions: [],
                head: {
                    mainHead: $routeParams.keyword,
                    subHead: "的搜索结果"
                },
                background: "18714f31d985cb8e8b59661cabd9d23a.jpg",
                defaultSum: {
                    text: ""
                }
            };
            var timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                actions: [
                    {
                        active: false,
                        text: "据点",
                        onClick: function () {
                            $location.url("search/point/" + encodeURIComponent($routeParams.keyword));
                        }
                    },
                    {
                        active: false,
                        text: "文章",
                        onClick: function () {
                            $location.url("search/article/" + encodeURIComponent($routeParams.keyword));
                        }
                    },
                    {
                        active: false,
                        text: "用户",
                        onClick: function () {
                            $location.url("search/user/" + encodeURIComponent($routeParams.keyword));
                        }
                    },
                    {
                        active: false,
                        text: "全站",
                        onClick: function () {
                        }
                    }
                ],
                datetime: "outBlock",
                entries: []
            };
            switch ($routeParams.searchType) {
                case "point":
                    timeline.actions[0].active = true;
                    timeline.loadAction = function () {
                        timeline.loadingLock = true;
                        var skip = timeline.entries.length;
                        $http.get(apiEndpoint + "normal-point/keyword/" + encodeURIComponent($routeParams.keyword), {
                            params: {
                                full: true,
                                skip: skip,
                                take: utils.timelineLoadCount
                            }
                        }).then(function (response) {
                            var totalRecordCount = response.headers("X-Total-Record-Count");
                            summary.defaultSum.text = "找到 " + totalRecordCount + " 个符合的项目";
                            timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                            var timelineTimeout;
                            if (totalRecordCount > 0) {
                                if (!skip)
                                    summary.background = response.data[0].BackgroundImage;
                                timeline.searchNotFound = false;
                                for (var i in response.data) {
                                    var point = response.data[i];
                                    var entry = {
                                        types: [utils.getPointType(point.Type)],
                                        pointInfo: {
                                            reader: point.SubscriberCount,
                                            article: point.ArticleCount
                                        },
                                        pointAvatar: point.AvatarImage,
                                        url: "point/" + point.IdCode,
                                        subscribed: point.Subscribed,
                                        id: point.Id
                                    };
                                    entry.title = utils.getPointFirstName(point);
                                    entry.summary = utils.getPointSecondName(point);

                                    (function (entry) {
                                        if (!timelineTimeout) {
                                            timeline.entries.push(entry);
                                            timelineTimeout = $timeout(function () {
                                            }, utils.timelineInsertDelay);
                                        } else {
                                            timelineTimeout = timelineTimeout.then(function () {
                                                timeline.entries.push(entry);
                                                return $timeout(function () {
                                                }, utils.timelineInsertDelay);
                                            });
                                        }
                                    })(entry);
                                }
                            } else {
                                timeline.searchNotFound = true;
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
                    };
                    timeline.loadAction();
                    break;
                case "article":
                    $scope.searchArticle = true;
                    timeline.actions[1].active = true;
                    timeline.loadAction = function () {
                        timeline.loadingLock = true;
                        var skip = timeline.entries.length;
                        $http.get(apiEndpoint + "article/keyword/" + encodeURIComponent($routeParams.keyword), {
                            params: {
                                full: true,
                                skip: skip,
                                take: utils.timelineLoadCount
                            }
                        }).then(function (response) {
                            var totalRecordCount = response.headers("X-Total-Record-Count");
                            summary.defaultSum.text = "找到 " + totalRecordCount + " 个符合的项目";
                            timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                            if (totalRecordCount > 0) {
                                if (!skip)
                                    summary.background = response.data[0].AuthorProfilePointBackgroundImage;
                                timeline.searchNotFound = false;
                                var timelineTimeout;
                                for (var i in response.data) {
                                    var article = response.data[i];
                                    var entry = {
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
                                    };
                                    (function (entry) {
                                        if (!timelineTimeout) {
                                            timeline.entries.push(entry);
                                            timelineTimeout = $timeout(function () {
                                            }, utils.timelineInsertDelay);
                                        } else {
                                            timelineTimeout = timelineTimeout.then(function () {
                                                timeline.entries.push(entry);
                                                return $timeout(function () {
                                                }, utils.timelineInsertDelay);
                                            });
                                        }
                                    })(entry);
                                }
                            } else {
                                timeline.searchNotFound = true;
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
                    };
                    timeline.loadAction();
                    break;
                case "user":
                    timeline.loadAction = function () {
                    };
                    timeline.loadingLock = true;
                    timeline.noMoreArticle = true;
                    timeline.actions[2].active = true;
                    $http.get(apiEndpoint + "user/" + encodeURIComponent($routeParams.keyword), {
                        params: {
                            idType: "UserName",
                            includeStats: true,
                            includeSubscribed: true,
                            includeProfilePointBackgroundImage: true
                        }
                    }).then(function (response) {
                        if (response.data) {
                            var user = response.data;
                            summary.background = user.ProfilePointBackgroundImage;
                            timeline.searchNotFound = false;
                            summary.defaultSum.text = "找到 1 个符合的项目";
                            timeline.entries.push({
                                types: ["个人"],
                                pointInfo: {
                                    reader: user.SubscriberCount,
                                    article: user.ArticleCount
                                },
                                title: user.UserName,
                                summary: user.GamerTag,
                                pointAvatar: user.AvatarImage,
                                url: "user/" + user.IdCode,
                                isUser: true,
                                id: user.Id
                            });
                            if (user.IdCode != union.$localStorage.user.IdCode) {
                                timeline.entries[0].subscribed = user.Subscribed;
                            }
                        }
                        timeline.loadingLock = false;
                    }, function (response) {
                        if (response.status === 404) {
                            summary.defaultSum.text = "找到 0 个符合的项目";
                        } else {
                            notification.error("未知错误", response);
                        }
                        timeline.loadingLock = false;
                        timeline.searchNotFound = true;
                    });
                    break;
            }

            union.timeline = timeline;
            union.summary = summary;
        }
    ]);
})();