(function () {
    keylolApp.controller('LoginPasswordController', [
        '$scope', 'close', '$http', 'utils', 'union', 'apiEndpoint', 'window', 'notification', '$element', '$timeout', '$httpParamSerializerJQLike',
        ($scope, close, $http, utils, union, apiEndpoint, window, notification, $element, $timeout, $httpParamSerializerJQLike) => {
            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;

            $scope.vm = {
                grant_type: 'password_captcha',
                client_id: 'keylol-website',
                id_code: '',
                password: '',
                geetest_challenge: '',
                geetest_seccode: '',
                geetest_validate: '',
            };

            let geetestResult;
            const geetest = utils.createGeetest('float');
            $scope.geetestId = geetest.id;
            geetest.ready.then(gee => {
                $timeout(() => {
                    const geetestDom = $(`#geetest-${geetest.id}`, $element);
                    gee.appendTo(geetestDom);
                });
            });
            function useGeetestResult (gee) {
                geetestResult = gee.getValidate();
                $scope.vm.geetest_challenge = geetestResult.geetest_challenge;
                $scope.vm.geetest_seccode = geetestResult.geetest_seccode;
                $scope.vm.geetest_validate = geetestResult.geetest_validate;
            }
            geetest.success.then(useGeetestResult);

            $scope.cancel = function () {
                close();
            };

            $scope.switchToLoginSteamWindow = function () {
                window.show({
                    templateUrl: 'src/windows/login-steam.html',
                    controller: 'LoginSteamController',
                });
                close();
            };

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                $scope.submitLock = true;
                $scope.error = {};
                $timeout(() => {
                    if (!$scope.vm.id_code) {
                        $scope.error['vm.id_code'] = 'Email or UIC cannot be empty.';
                    }
                    if (!$scope.vm.password) {
                        $scope.error['vm.password'] = 'Password cannot be empty.';
                    }
                    if (!geetestResult) {
                        $scope.error.authCode = true;
                    }
                    if (!$.isEmptyObject($scope.error)) {
                        $scope.submitLock = false;
                        return;
                    }
                    $http.post(`${apiEndpoint}oauth/token`, $httpParamSerializerJQLike($scope.vm), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        union.$localStorage.Authorization = response.data.access_token;
                        notification.success('登录成功，欢迎回到其乐');
                        close();
                    }, response => {
                        if (response.status === 400 && response.data.error) {
                            switch (response.data.error) {
                                case 'invalid_captcha':
                                    $scope.error.authCode = true;
                                    break;
                                case 'user_nonexistent':
                                    $scope.error['vm.id_code'] = 'user doesn\'t exist';
                                    break;
                                case 'invalid_password':
                                    $scope.error['vm.password'] = 'password is not correct';
                                    break;
                                default:
                                    notification.error('发生未知错误，请重试或与站务职员联系');
                            }
                        } else {
                            console.log(124);
                            notification.error('发生未知错误，请重试或与站务职员联系', response);
                        }
                        geetestResult = null;
                        geetest.refresh().then(useGeetestResult);
                        $scope.submitLock = false;
                    });
                });
            };
        },
    ]);
}());
