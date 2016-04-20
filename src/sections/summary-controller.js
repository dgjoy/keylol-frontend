/**
 * Created by Rex on 15/9/23.
 */
(function () {
    keylolApp.controller("SummaryController", [
        "$scope", "union", "$http", "notification",
        ($scope, union, $http, notification) => {
            $scope.union = union;
            $scope.data = union.summary;
            $scope.subscribeDisabled = false;
            $scope.subscribe = function (pointId) {
                $scope.subscribeDisabled = true;
                $http.post(`${apiEndpoint}user-point-subscription`, {}, {
                    params: { pointId },
                }).then(() => {
                    notification.success("据点已订阅，其今后收到的文章投稿将推送到你的首页");
                    $scope.data.subscribed = true;
                    $scope.subscribeDisabled = false;
                    $scope.data.pointSum.readerNum++;
                    union.$localStorage.user.SubscribedPointCount++;
                }, response => {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                    $scope.subscribeDisabled = false;
                });
            };
            $scope.unsubscribe = function (pointId) {
                $scope.subscribeDisabled = true;
                notification.attention("退订并不再接收此据点的文章推送", [
                    { action: "退订", value: true },
                    { action: "取消" },
                ]).then(result => {
                    if (result) {
                        $http.delete(`${apiEndpoint}user-point-subscription`, {
                            params: { pointId },
                        }).then(() => {
                            notification.success("据点已退订");
                            $scope.data.subscribed = false;
                            $scope.data.pointSum.readerNum--;
                            union.$localStorage.user.SubscribedPointCount--;
                        }, response => {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        }).finally(() => {
                            $scope.subscribeDisabled = false;
                        });
                    } else {
                        $scope.subscribeDisabled = false;
                    }
                });
            };
        },
    ]);
}());
