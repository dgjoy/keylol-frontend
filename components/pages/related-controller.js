/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("RelatedController", [
        "pageHead", "$scope", "union", "$http", "notification", "$routeParams", "utils", "$timeout",
        function (pageHead, $scope, union, $http, notification, $routeParams, utils, $timeout) {
            $scope.searchExist = true;
            $scope.union = union;
            if (!$routeParams.idCode || !$routeParams.type) {
                $scope.searchExist = false;
            }
            var typeText, summary = {};
            switch ($routeParams.type) {
                case "Genre":
                    typeText = "流派";
                    break;
                case "Tag":
                    typeText = "特性";
                    break;
                case "Series":
                    typeText = "系列";
                    break;
                case "Publisher":
                    typeText = "历代发行";
                    break;
                case "Developer":
                    typeText = "历代开发";
                    break;
                default:
                    $scope.searchExist = false;
            }

            $http.get(apiEndpoint + "normal-point/" + $routeParams.idCode, {
                params: {
                    stats: true,
                    subscribed: true,
                    idType: "IdCode"
                }
            }).then(function (response) {

                var point = response.data;

                pageHead.setTitle(utils.getPointFirstName(point) + " - " + typeText + " 的游戏 - 其乐");
                $.extend(summary, {
                    head: {
                        mainHead: utils.getPointFirstName(point),
                        subHead: utils.getPointSecondName(point)
                    },
                    avatar: point.AvatarImage,
                    subscribed: point.Subscribed,
                    background: point.BackgroundImage,
                    pointSum: {
                        type: utils.getPointType(point.Type),
                        readerNum: point.SubscriberCount,
                        articleNum: point.ArticleCount
                    },
                    id: point.Id,
                    url: "point/" + point.IdCode
                });

            }, function (response) {
                $scope.searchExist = false;
                notification.error("发生未知错误，请重试或与站务职员联系", response);
            });

            var timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                cannotClick: true,
                loadAction: function () {
                    timeline.loadingLock = true;
                    $http.get(apiEndpoint + "normal-point/" + $routeParams.idCode + "/games", {
                        params: {
                            take: utils.timelineLoadCount,
                            skip: timeline.entries.length,
                            idType: "IdCode",
                            stats: true,
                            relationship: $routeParams.type
                        }
                    }).then(function (response) {
                        timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                        var timelineTimeout;
                        if (response.data.length > 0) {
                            timeline.searchNotFound = false;
                            var entry;
                            for (var i in response.data) {
                                var point = response.data[i];
                                entry = {
                                    types: [utils.getPointType(point.Type)],
                                    pointInfo: {
                                        reader: response.data[i].SubscriberCount,
                                        article: response.data[i].ArticleCount
                                    },
                                    title: utils.getPointFirstName(point),
                                    summary: utils.getPointSecondName(point),
                                    hasBackground: true,
                                    isPoint: true,
                                    background: point.BackgroundImage,
                                    pointAvatar: point.AvatarImage,
                                    url: "point/" + point.IdCode,
                                    subscribed: point.Subscribed,
                                    id: point.Id
                                };
                                timeline.entries.push(entry);
                                (function (entry) {
                                    $timeout(function () {
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
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
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