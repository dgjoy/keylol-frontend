(function () {
    class LoginSteamController {
        constructor($scope, close, $http, apiEndpoint, window, union, $timeout, notification, utils, $httpParamSerializerJQLike) {
            const connection = $.connection.new();
            const steamLoginHubProxy = connection.steamLoginHub;

            $.extend(this,{
                close,
                window,
                utils,
                connection,
                currentStation: 0,
            });

            steamLoginHubProxy.client.onLoginOneTimeToken = token => {
                // 用户在 Steam 输入验证码并输入正确后，服务器会通过这个方法通知浏览器，token 是登录用的 one-time token
                $scope.$apply(() => {
                    this.currentStation = 1;
                    $http.post(`${apiEndpoint}oauth/token`, $httpParamSerializerJQLike({
                        token,
                        grant_type: 'one_time_token',
                        client_id: 'keylol-website',
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
                                case 'user_non_existent':
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

            steamLoginHubProxy.client.onCode = code => {
                // code 是收到的四位数字 Steam 登录验证码
                $scope.$apply(() => {
                    this.code = code;
                });
            };

            connection.start().fail(() => {
                notification.error('连接失败');
                this.cancel();
            });
        }

        cancel() {
            this.close();
            this.connection.stop();
        };

        switchToLoginPasswordWindow() {
            this.window.show({
                templateUrl: 'src/windows/login-password.html',
                controller: 'LoginPasswordController',
                controllerAs: 'LoginPassword',
            });
            this.cancel();
        };
    }
    
    keylolApp.controller('LoginSteamController', LoginSteamController);
}());
