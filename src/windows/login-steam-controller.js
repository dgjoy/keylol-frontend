(function () {
    keylolApp.controller("LoginSteamController", [
        "$scope", "close", "$http", "apiEndpoint", "window", "union", "$timeout", "notification", "utils", "$route",
        ($scope, close, $http, apiEndpoint, window, union, $timeout, notification, utils, $route) => {
            const connection = $.connection.new();
            const steamLoginHubProxy = connection.steamLoginHub;
            let tokenId;

            $scope.currentStation = 0;
            $scope.utils = utils;

            $scope.cancel = function () {
                close();
                connection.stop();
            };

            $scope.switchToLoginPasswordWindow = function () {
                window.show({
                    templateUrl: "src/windows/login-password.html",
                    controller: "LoginPasswordController",
                });
                $scope.cancel();
            };

            steamLoginHubProxy.client.NotifyCodeReceived = function () {
                $scope.$apply(() => {
                    $scope.currentStation = 1;
                    $http.post(`${apiEndpoint}login/token/${tokenId}`, null).then(response => {
                        $scope.currentStation = 2;
                        union.$localStorage.login = response.data;
                        connection.stop();
                        $timeout(() => {
                            notification.success("登录成功，欢迎回到其乐");
                            close();
                        }, 1500);
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                });
            };

            connection.start().then(() => {
                steamLoginHubProxy.server.createToken().then(token => {
                    $scope.$apply(() => {
                        tokenId = token.Id;
                        $scope.code = token.Code;
                    });
                });
            }, () => {
                notification.error("连接失败");
                $scope.cancel();
            });
        },
    ]);
}());
