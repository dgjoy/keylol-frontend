(function () {
    "use strict";

    keylolApp.controller("PointPreviewCardController", [
        "$scope", "idCode", "$timeout", "$http", "utils", "notification", "union",
        function ($scope, idCode, $timeout, $http, utils, notification, union) {
            $scope.loading = true;
            if (!union.pointCards) {
                union.pointCards = {};
            }
            if (!union.pointCards[idCode]) {
                $http.get(apiEndpoint + "normal-point/" + idCode, {
                    params: {
                        includeStats: true,
                        includeSubscribed: true,
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
                    if (point.PreferedName == "Chinese") {
                        $scope.data.head.mainHead = point.ChineseName;
                        $scope.data.head.subHead = point.EnglishName;
                    } else {
                        $scope.data.head.mainHead = point.EnglishName;
                        $scope.data.head.subHead = point.ChineseName;
                    }
                    union.pointCards[idCode] = $scope.data;
                    $scope.loading = false;
                }, function (error) {
                    notification.error("据点卡片请求错误");
                    console.log(error);
                });
            } else {
                $scope.loading = false;
                $scope.data = union.pointCards[idCode];
            }
            $scope.subscribeDisabled = false;
            $scope.subscribe = function (id) {
                $scope.subscribeDisabled = true;
                $http.post(apiEndpoint + "user-point-subscription", {}, {
                    params: {
                        pointId: id
                    }
                }).then(function () {
                    notification.success("订阅成功！");
                    $scope.data.subscribed = true;
                    $scope.subscribeDisabled = false;
                    $scope.data.pointSum.readerNum++;
                }, function (error) {
                    notification.error("未知错误");
                    console.error(error);
                });
            };
            $scope.unsubscribe = function (id) {
                $scope.subscribeDisabled = true;
                $http.delete(apiEndpoint + "user-point-subscription", {
                    params: {
                        pointId: id
                    }
                }).then(function () {
                    notification.success("取消订阅成功！");
                    $scope.data.subscribed = false;
                    $scope.subscribeDisabled = false;
                    $scope.data.pointSum.readerNum--;
                }, function (error) {
                    notification.error("未知错误");
                    console.error(error);
                });
            };
        }
    ]);
})();