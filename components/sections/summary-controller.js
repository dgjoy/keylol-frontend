/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("SummaryController", [
        "$scope", "union", "$http", "notification",
        function ($scope, union, $http, notification) {
            $scope.data = union.summary;
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
            }
        }
    ]);
})();