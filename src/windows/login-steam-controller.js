(function () {
    keylolApp.controller('LoginSteamController', [
        '$scope', 'close', '$http', 'apiEndpoint', 'window', 'union', '$timeout', 'notification', 'utils', '$httpParamSerializerJQLike',
        ($scope, close, $http, apiEndpoint, window, union, $timeout, notification, utils, $httpParamSerializerJQLike) => {
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
                    templateUrl: 'src/windows/login-password.html',
                    controller: 'LoginPasswordController',
                });
                $scope.cancel();
            };

            steamLoginHubProxy.client.NotifyCodeReceived = function () {
                $scope.$apply(() => {
                    $scope.currentStation = 1;
                    $http.post(`${apiEndpoint}oauth/token`, $httpParamSerializerJQLike({
                        grant_type: 'steam_login_token',
                        client_id: 'keylol-website',
                        token_id: tokenId,
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        $scope.currentStation = 2;
                        union.$localStorage.Authorization = response.data.access_token;
                        connection.stop();
                        $timeout(() => {
                            notification.success('登录成功，欢迎回到其乐');
                            close();
                        }, 1500);
                    }, response => {
                        if (response.status === 400 && response.data.error) {
                            switch (response.data.error) {
                                case 'invalid_token':
                                    notification.error('Steam Id 无效');
                                    break;
                                case 'user_nonexistent':
                                    notification.error('用户不存在');
                                    break;
                                case 'account_locked_out':
                                    notification.error('用户登录次数过多，暂时被锁定');
                                    break;
                                default:
                                    notification.error('发生未知错误，请重试或与站务职员联系');
                            }
                        } else {
                            notification.error('发生未知错误，请重试或与站务职员联系', response);
                        }
                        $scope.cancel();
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
                notification.error('连接失败');
                $scope.cancel();
            });
        },
    ]);
}());
