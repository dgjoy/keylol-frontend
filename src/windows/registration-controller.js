(function () {
    keylolApp.controller('RegistrationController', [
        '$scope', 'close', '$http', 'utils', 'union', 'apiEndpoint', 'window', 'notification', '$element', '$timeout', '$location', 'options',
        '$stateParams', '$httpParamSerializerJQLike',
        ($scope, close, $http, utils, union, apiEndpoint, window, notification, $element, $timeout, $location, options,
         $stateParams, $httpParamSerializerJQLike) => {
            $scope.vm = {
                IdCode: '',
                UserName: '',
                Password: '',
                SteamBindingTokenId: '',
                AvatarImage: '',
                SteamProfileName: '',
                GeetestChallenge: '',
                GeetestSeccode: '',
                GeetestValidate: '',
                InvitationCode: union.invitationCode,
            };
            let consumeBindingToken, geetestResult;
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
                $scope.vm.GeetestChallenge = geetestResult.geetest_challenge;
                $scope.vm.GeetestSeccode = geetestResult.geetest_seccode;
                $scope.vm.GeetestValidate = geetestResult.geetest_validate;
            }
            geetest.success.then(useGeetestResult);

            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;

            $scope.cancel = () => {
                close();
                if (consumeBindingToken)
                    consumeBindingToken.resolve();
            };

            $scope.showSteamConnectWindow = () => {
                window.show({
                    templateUrl: 'src/windows/steam-connect.html',
                    controller: 'SteamConnectController',
                    inputs: {
                        options: {
                            registrationClose: $scope.cancel,
                            whenReviewing: options.whenReviewing,
                        },
                    },
                }).then(window => {
                    window.close.then(result => {
                        if (result) {
                            consumeBindingToken = result.consume;
                            $scope.vm.SteamBindingTokenId = result.tokenId;
                            $scope.vm.SteamProfileName = result.steamProfileName;
                            $scope.vm.AvatarImage = `keylol://steam/avatars/${result.steamAvatarHash}`;
                        } else {
                            $scope.vm.SteamBindingTokenId = '';
                        }
                    });
                });
            };
            $timeout($scope.showSteamConnectWindow, 500);

            $scope.discardBinding = function () {
                $scope.vm.SteamBindingTokenId = '';
                if (consumeBindingToken)
                    consumeBindingToken.resolve();
            };

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                $scope.submitLock = true;
                $scope.error = {};
                $timeout(() => {
                    $scope.vm.IdCode = $scope.vm.IdCode.toUpperCase();
                    utils.modelValidate.steamBindingTokenId($scope.vm.SteamBindingTokenId, $scope.error, 'vm.SteamBindingTokenId');
                    utils.modelValidate.idCode($scope.vm.IdCode, $scope.error, 'vm.IdCode');
                    utils.modelValidate.username($scope.vm.UserName, $scope.error, 'vm.UserName');
                    utils.modelValidate.password($scope.vm.Password, $scope.error, 'vm.Password');
                    if (!geetestResult) {
                        $scope.error.authCode = true;
                    }
                    if (!$.isEmptyObject($scope.error)) {
                        $scope.submitLock = false;
                        return;
                    }
                    if ($location.search().aff) {
                        $scope.vm.Inviter = $location.search().aff;
                    } else if ($location.url().substr(1, 7) === 'article') {
                        $scope.vm.Inviter = $stateParams.author;
                    }
                    $http.post(`${apiEndpoint}user`, $scope.vm)
                        .then(response => {
                            union.$localStorage.firstOpenKeylol = true;

                            $http.post(`${apiEndpoint}oauth/token`, $httpParamSerializerJQLike({
                                token: response.data,
                                grant_type: 'one_time_token',
                                client_id: 'keylol-website',
                            }), {
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
                                close();
                            });
                            if (consumeBindingToken)
                                consumeBindingToken.resolve();
                        }, response => {
                            switch (response.status) {
                                case 400:
                                    $scope.error = response.data.ModelState;
                                    geetestResult = null;
                                    geetest.refresh().then(useGeetestResult);
                                    break;
                                default:
                                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                            }
                            $scope.submitLock = false;
                        });
                });
            };
        },
    ]);
}());
