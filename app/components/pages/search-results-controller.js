/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("SearchResultsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "$routeParams", "$location", "utils",
        function (pageTitle, $scope, union, $http, notification, $routeParams, $location, utils) {
            $scope.searchExist = true;
            if (!$routeParams.searchType || !$routeParams.keyword) {
                $scope.searchExist = false;
            }
            pageTitle.set($routeParams.keyword + " 的搜索结果 - 其乐");
            union.summary = {
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
            union.timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                noMoreArticle: true,
                searchNotFound: true,
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
                    union.timeline.actions[0].active = true;
                    union.timeline.loadAction = function (callback) {
                        var skip = union.timeline.entries.length;
                        $http.get(apiEndpoint + "normal-point/keyword/" + encodeURIComponent($routeParams.keyword), {
                            params: {
                                full: true,
                                skip: skip,
                                take: utils.timelineLoadCount
                            }
                        }).then(function (response) {
                            var totalRecordCount = response.headers("X-Total-Record-Count");
                            union.summary.defaultSum.text = "找到 " + totalRecordCount + " 个符合的项目";
                            union.timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                            if (totalRecordCount > 0) {
                                if (!skip)
                                    union.summary.background = response.data[0].BackgroundImage;
                                union.timeline.searchNotFound = false;
                                for (var i in response.data) {
                                    var point = response.data[i];
                                    var result = {
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
                                    result.title = utils.getPointFirstName(point);
                                    result.summary = utils.getPointSecondName(point);
                                    union.timeline.entries.push(result);
                                }
                            }
                        }, function (error) {
                            notification.error("未知错误", error);
                        }).finally(function () {
                            if (callback) {
                                callback();
                            }
                        });
                    };
                    union.timeline.loadAction();
                    break;
                case "article":
                    union.timeline.actions[1].active = true;
                    union.timeline.loadAction = function (callback) {
                        var skip = union.timeline.entries.length;
                        $http.get(apiEndpoint + "article/keyword/" + encodeURIComponent($routeParams.keyword), {
                            params: {
                                full: true,
                                skip: skip,
                                take: utils.timelineLoadCount
                            }
                        }).then(function (response) {
                            var totalRecordCount = response.headers("X-Total-Record-Count");
                            union.summary.defaultSum.text = "找到 " + totalRecordCount + " 个符合的项目";
                            union.timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                            if (totalRecordCount > 0) {
                                if (!skip)
                                    union.summary.background = response.data[0].AuthorProfilePointBackgroundImage;
                                union.timeline.searchNotFound = false;
                                for (var i in response.data) {
                                    var article = response.data[i];
                                    var result = {
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
                                    union.timeline.entries.push(result);
                                }
                            }
                        }, function (error) {
                            notification.error("未知错误", error);
                        }).finally(function () {
                            if (callback) {
                                callback();
                            }
                        });
                    };
                    union.timeline.loadAction();
                    break;
                case "user":
                    union.timeline.loadAction = function () {
                    };
                    union.timeline.actions[2].active = true;
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
                            union.summary.background = user.ProfilePointBackgroundImage;
                            union.timeline.searchNotFound = false;
                            union.summary.defaultSum.text = "找到 1 个符合的项目";
                            union.timeline.entries.push({
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
                                union.timeline.entries[0].subscribed = user.Subscribed;
                            }
                        }
                    }, function (error) {
                        if (error.status === 404) {
                            union.summary.defaultSum.text = "找到 0 个符合的项目";
                        } else {
                            notification.error("未知错误", error);
                        }
                    });
                    break;
                default :
                    $location.url("404");
            }
        }
    ]);
})();