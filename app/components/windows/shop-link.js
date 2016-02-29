(function () {
    "use strict";

    keylolApp.controller("ShopLinkController", [
        "$scope", "close", "$http", "apiEndpoint", "utils", "notification", "window",
        function ($scope, close, $http, apiEndpoint, utils, notification, window) {
            $scope.vm = {};
            $scope.submitLock = false;
            $scope.currentStation = 0;
            $scope.cancel = function () {
                close();
            };
            $scope.shopLinkError = false;
            $scope.submit = function () {
                if (!$scope.submitLock) {
                    $scope.submitLock = true;
                    var appId = checkShopLink($scope.vm.shopLink);
                    if (appId) {
                        notification.process("正在抓取商店信息，可能需要几秒的时间");
                        $scope.currentStation = 1;
                        $http.post(apiEndpoint + "normal-point/from-app-id", {}, {
                            params: {
                                appId: appId
                            }
                        }).then(function (response) {
                            var point = response.data;
                            $scope.submitLock = false;
                            window.show({
                                templateUrl: "components/windows/confirmation.html",
                                controller: "ConfirmationController",
                                inputs: {
                                    point: point
                                }
                            });
                            close();
                        }, function (response) {
                            notification.error("未知错误", response);
                            $scope.submitLock = false;
                        });
                    } else {
                        $scope.shopLinkError = true;
                        $scope.submitLock = false
                    }
                }
            };

            function checkShopLink(input) {
                var matches = input.match(/(?:https?:\/\/)?store\.steampowered\.com\/app\/(\d+)\/*/i);
                if (matches) {
                    return parseInt(matches[1]);
                }
                return false;
            }
        }
    ]);
})();