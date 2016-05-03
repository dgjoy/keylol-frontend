(function () {
    class LoginSteamController {
        constructor($scope, close, $http, apiEndpoint, window, union, $timeout, notification, utils, $httpParamSerializerJQLike) {
            $.extend(this,{
                close,
                window,
            });
            
            const connection = $.connection.new();
            const steamLoginHubProxy = connection.steamLoginHub;
            let tokenId;

            this.currentStation = 0;
            this.utils = utils;

            steamLoginHubProxy.client.NotifyCodeReceived = () => {
                $scope.$apply(() => {
                    this.currentStation = 1;
                    $http.post(`${apiEndpoint}oauth/token`, $httpParamSerializerJQLike({
                        grant_type: 'steam_login_token',
                        client_id: 'keylol-website',
                        token_id: tokenId,
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        this.currentStation = 2;
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
                        this.cancel();
                    });
                });
            };

            connection.start().then(() => {
                steamLoginHubProxy.server.createToken().then(token => {
                    $scope.$apply(() => {
                        tokenId = token.Id;
                        this.code = token.Code;
                    });
                });
            }, () => {
                notification.error('连接失败');
                this.cancel();
            });

            $.extend(this,{
                connection,
            });
        }

        cancel() {
            const close = this.close;
            const connection = this.connection;

            close();
            connection.stop();
        };

        switchToLoginPasswordWindow() {
            const window = this.window;

            window.show({
                templateUrl: 'src/windows/login-password.html',
                controller: 'LoginPasswordController',
                controllerAs: 'LoginPassword',
            });
            this.cancel();
        };
    }
    
    keylolApp.controller('LoginSteamController', LoginSteamController);
}());
