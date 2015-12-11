/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("SubscriptionsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "$location", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, $location, utils, $timeout) {
            $scope.union = union;
            $scope.searchExist = true;
            var summary = {
                head: {
                    mainHead: union.$localStorage.user.UserName,
                    subHead: union.$localStorage.user.GamerTag
                },
                avatar: union.$localStorage.user.AvatarImage,
                pointSum: {
                    type: "个人",
                    readerNum: union.$localStorage.user.SubscriberCount,
                    articleNum: union.$localStorage.user.ArticleCount
                }
            };
            pageTitle.set(union.$localStorage.user.UserName + " 的订阅 - 其乐");

            $http.get(apiEndpoint + "user/" + union.$localStorage.user.IdCode, {
                params: {
                    idType: "IdCode",
                    includeProfilePointBackgroundImage: true
                }
            }).then(function (response) {
                summary.background = response.data.ProfilePointBackgroundImage;
            }, function (response) {
                notification.error("未知错误", response);
            });

            var timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                cannotClick: true,
                loadAction: function () {
                    timeline.loadingLock = true;
                    $http.get(apiEndpoint + "user-point-subscription/my", {
                        params: {
                            take: utils.timelineLoadCount,
                            skip: timeline.entries.length
                        }
                    }).then(function (response) {
                        timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                        var timelineTimeout;
                        if (response.data.length > 0) {
                            timeline.searchNotFound = false;
                            var entry;
                            for (var i in response.data) {
                                if (response.data[i].NormalPoint) {
                                    var point = response.data[i].NormalPoint;
                                    entry = {
                                        types: [utils.getPointType(point.Type)],
                                        pointInfo: {
                                            reader: response.data[i].SubscriberCount,
                                            article: response.data[i].ArticleCount
                                        },
                                        title: utils.getPointFirstName(point),
                                        summary: utils.getPointSecondName(point),
                                        pointAvatar: point.AvatarImage,
                                        url: "point/" + point.IdCode,
                                        subscribed: true,
                                        id: point.Id
                                    };
                                } else if (response.data[i].User) {
                                    var user = response.data[i].User;
                                    timeline.searchNotFound = false;
                                    entry = {
                                        types: ["个人"],
                                        pointInfo: {
                                            reader: response.data[i].SubscriberCount,
                                            article: response.data[i].ArticleCount
                                        },
                                        subscribed: true,
                                        title: user.UserName,
                                        summary: user.GamerTag,
                                        pointAvatar: user.AvatarImage,
                                        url: "user/" + user.IdCode,
                                        isUser: true,
                                        id: user.Id
                                    };
                                }
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
                },
                entries: []
            };
            timeline.loadAction();

            union.timeline = timeline;
            union.summary = summary;
        }
    ]);
})();