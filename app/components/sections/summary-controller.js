/**
 * Created by Rex on 15/9/23.
 */
(function() {
    "use strict";

    keylolApp.controller("SummaryController", [
        "$scope", "union", "$http",
        function($scope, union, $http) {
            $scope.data = union.summary;
            $scope.subscribeDisabled = false;
            $scope.subscribe = function(id){
                $scope.subscribeDisabled = true;
                $http.post(apiEndpoint + "user-point-subscription", {}, {
                    params: {
                        pointId: id
                    }
                }).then(function () {
                    alert("订阅成功！");
                    $scope.data.subscribed = true;
                    $scope.subscribeDisabled = false;
                    $scope.data.pointSum.readerNum++;
                }, function (error) {
                    alert("未知错误");
                    console.error(error);
                });
            };
            $scope.unsubscribe = function(id){
                $scope.subscribeDisabled = true;
                $http.delete(apiEndpoint + "user-point-subscription", {
                    params: {
                        pointId: id
                    }
                }).then(function () {
                    alert("取消订阅成功！");
                    $scope.data.subscribed = false;
                    $scope.subscribeDisabled = false;
                    $scope.data.pointSum.readerNum--;
                }, function (error) {
                    alert("未知错误");
                    console.error(error);
                });
            }
        }
    ]);
})();