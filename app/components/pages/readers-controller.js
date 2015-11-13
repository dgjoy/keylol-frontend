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
            union.summary = {
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
                union.summary.background = response.data.ProfilePointBackgroundImage;
            }, function (response) {
                notification.error("未知错误", response);
            });

            union.timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                datetime: "outBlock",
                loadAction: function () {
                    union.timeline.loadingLock = true;
                    $http.get(apiEndpoint + "user/my", {
                        params: {
                            take: utils.timelineLoadCount,
                            skip: union.timeline.entries.length
                        }
                    }).then(function (response) {
                        union.timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                        var timelineTimeout;
                        if (response.data.length > 0) {
                            union.timeline.searchNotFound = false;
                            for (var i in response.data) {
                                var user = response.data[i];
                                union.timeline.searchNotFound = false;
                                var entry = {
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
                                };
                                (function (entry) {
                                    if (!timelineTimeout) {
                                        union.timeline.entries.push(entry);
                                        timelineTimeout = $timeout(function () {
                                        }, utils.timelineInsertDelay);
                                    } else {
                                        timelineTimeout = timelineTimeout.then(function () {
                                            union.timeline.entries.push(entry);
                                            return $timeout(function () {
                                            }, utils.timelineInsertDelay);
                                        });
                                    }
                                })(entry);
                            }
                        } else {
                            union.timeline.searchNotFound = true;
                        }
                        if (timelineTimeout) {
                            timelineTimeout.then(function () {
                                union.timeline.loadingLock = false;
                            });
                        } else {
                            union.timeline.loadingLock = false;
                        }
                    }, function (response) {
                        notification.error("未知错误", response);
                        union.timeline.loadingLock = false;
                    });
                },
                entries: []
            };
            union.timeline.loadAction();
        }
    ]);
})();