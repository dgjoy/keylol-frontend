/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("ReadersController", [
        "pageTitle", "$scope", "union", "$http", "notification", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, utils, $timeout) {
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
            pageTitle.set(union.$localStorage.user.UserName + " 的读者 - 其乐");

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
                    $http.get(apiEndpoint + "user/my", {
                        params: {
                            take: utils.timelineLoadCount,
                            skip: timeline.entries.length
                        }
                    }).then(function (response) {
                        timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                        var timelineTimeout;
                        if (response.data.length > 0) {
                            timeline.searchNotFound = false;
                            for (var i in response.data) {
                                var user = response.data[i];
                                timeline.searchNotFound = false;
                                var entry = {
                                    types: ["个人"],
                                    pointInfo: {
                                        reader: user.SubscriberCount,
                                        article: user.ArticleCount
                                    },
                                    title: user.UserName,
                                    summary: user.GamerTag,
                                    hasBackground: true,
                                    background: user.ProfilePointBackgroundImage,
                                    pointAvatar: user.AvatarImage,
                                    url: "user/" + user.IdCode,
                                    isUser: true,
                                    id: user.Id
                                };
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