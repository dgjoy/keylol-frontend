(function () {
    "use strict";

    keylolApp.controller("PointPreviewCardController", [
        "$scope", "idCode", "type", "$timeout", "$http", "utils", "notification", "union",
        function ($scope, idCode, type, $timeout, $http, utils, notification, union) {
            $scope.loading = true;
            if (type === "point") {
                if (!union.pointCards) {
                    union.pointCards = {};
                }
                if (!union.pointCards[idCode]) {
                    $http.get(apiEndpoint + "normal-point/" + idCode, {
                        params: {
                            stats: true,
                            subscribed: true,
                            idType: "IdCode"
                        }
                    }).then(function (response) {
                        var point = response.data;
                        $scope.data = {
                            id: point.Id,
                            subscribed: point.Subscribed,
                            head: {},
                            avatar: point.AvatarImage,
                            background: point.BackgroundImage,
                            pointSum: {
                                type: utils.getPointType(point.Type),
                                readerNum: point.SubscriberCount,
                                articleNum: point.ArticleCount
                            }
                        };
                        $scope.data.head.mainHead = utils.getPointFirstName(point);
                        $scope.data.head.subHead = utils.getPointSecondName(point);
                        if (union.pointCards) {
                            union.pointCards[idCode] = $scope.data;
                        }
                        $scope.loading = false;
                    }, function (response) {
                        notification.error("据点卡片请求错误", response);
                    });
                } else {
                    $scope.loading = false;
                    $scope.data = union.pointCards[idCode];
                }
            } else {
                if (!union.userCards) {
                    union.userCards = {};
                }
                if (!union.userCards[idCode]) {
                    var includeSubscribed = true;
                    if (idCode === union.$localStorage.user.IdCode) {
                        includeSubscribed = false;
                    }
                    $http.get(apiEndpoint + "user/" + idCode, {
                        params: {
                            stats: true,
                            subscribed: includeSubscribed,
                            profilePointBackgroundImage: true,
                            idType: "IdCode"
                        }
                    }).then(function (response) {
                        var user = response.data;
                        $scope.data = {
                            id: user.Id,
                            subscribed: user.Subscribed,
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
                            }
                        };
                        union.userCards[idCode] = $scope.data;
                        $scope.loading = false;
                    }, function (response) {
                        notification.error("据点卡片请求错误", response);
                    });
                } else {
                    $scope.loading = false;
                    $scope.data = union.userCards[idCode];
                }
            }
            $scope.subscribeDisabled = false;
            $scope.subscribe = function (id) {
                $scope.subscribeDisabled = true;
                $http.post(apiEndpoint + "user-point-subscription", {}, {
                    params: {
                        pointId: id
                    }
                }).then(function () {
                    notification.success("据点已订阅，其今后收到的文章投稿将推送到你的首页");
                    $scope.data.subscribed = true;
                    $scope.subscribeDisabled = false;
                    $scope.data.pointSum.readerNum++;
                    union.$localStorage.user.SubscribedPointCount++;
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            };
            $scope.unsubscribe = function (id) {
                $scope.subscribeDisabled = true;
                notification.attention("退订并不再接收此据点的文章推送", [
                    {action: "退订", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        $http.delete(apiEndpoint + "user-point-subscription", {
                            params: {
                                pointId: id
                            }
                        }).then(function () {
                            notification.success("据点已退订");
                            $scope.data.subscribed = false;
                            $scope.data.pointSum.readerNum--;
                            union.$localStorage.user.SubscribedPointCount--;
                        }, function (response) {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        }).finally(function () {
                            $scope.subscribeDisabled = false;
                        });
                    } else {
                        $scope.subscribeDisabled = false;
                    }
                });
            };
        }
    ]);
})();