(function () {
    "use strict";

    keylolApp.controller("LoginSteamController", [
        "$scope", "close", "$http", "apiEndpoint", "window", "union", "$timeout", "notification", "utils", "$location",
        function ($scope, close, $http, apiEndpoint, window, union, $timeout, notification, utils, $location) {
            var connection = $.connection.new();
            var steamLoginHubProxy = connection.steamLoginHub;
            var tokenId;

            $scope.currentStation = 0;
            $scope.utils = utils;

            $scope.cancel = function () {
                close();
                connection.stop();
            };

            $scope.switchToLoginPasswordWindow = function () {
                window.show({
                    templateUrl: "components/windows/login-password.html",
                    controller: "LoginPasswordController"
                });
                $scope.cancel();
            };

            steamLoginHubProxy.client.NotifyCodeReceived = function () {
                $scope.$apply(function () {
                    $scope.currentStation = 1;
                    $http.post(apiEndpoint + "login/token/" + tokenId, null)
                        .then(function (response) {
                            $scope.currentStation = 2;
                            union.$localStorage.login = response.data;
                            connection.stop();
                            $timeout(function () {
                                notification.success("登录成功，欢迎回到其乐");
                                $location.url("/home");
                                close();
                            }, 1500);
                        }, function (response) {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        });
                });
            };

            connection.start().then(function () {
                steamLoginHubProxy.server.createToken().then(function (token) {
                    $scope.$apply(function () {
                        tokenId = token.Id;
                        $scope.code = token.Code;
                    });
                });
            }, function () {
                notification.error("连接失败");
                $scope.cancel();
            });
        }
    ]);
})();