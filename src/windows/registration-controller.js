(function () {
    class RegistrationController {
        constructor(close, $scope, $timeout, notification, $http, utils, union, $q, apiEndpoint) {
            $.extend(this,{
                close,
                notification,
                $http,
                utils,
                union,
                apiEndpoint,
            });
            this.platform = '';
            this.platformsToSelect = {
                title:'选择后需要连接平台',
                items: [
                    'Steam',
                ],
            };
            this.error = {};

            const connection = $.connection.new();
            const steamBindingHubProxy = connection.steamBindingHub;
            let tokenId;

            this.phase = '未选择平台'; // 未选择平台,添加好友,发送验证码,连接成功,填写表单
            this.conn = null;

            $scope.$watch(() => {
                return this.platform;
            },newVal => {
                switch (newVal) {
                    case 0:
                        this.conn = {
                            index: 0,
                            phases: [
                                '添加机器人为好友',
                                '发送连接验证码',
                                '连接平台成功',
                            ],
                            vm: {
                                IdCode: '',
                                UserName: '',
                                Password: '',
                                SteamBindingTokenId: '',
                                AvatarImage: '',
                                SteamProfileName: '',
                            },
                            code: '',
                            botSteamId64: '',
                            botName: '',
                        };
                        steamBindingHubProxy.client.onFriend = () => {
                            $scope.$apply(() => {
                                this.conn.index = 1;
                                this.phase = '发送验证码';
                            });
                        };

                        steamBindingHubProxy.client.onCode = (tokenId, code, botSteamId, botName) => {
                            $scope.$apply(() => {
                                const consume = $q.defer();
                                consume.promise.finally(() => {
                                    connection.stop();
                                });

                                this.conn.index = 1;
                                this.phase = '发送验证码';
                                this.conn.code = code;
                                this.conn.botName = botName;
                                this.conn.botSteamId64 = this.utils.getSteamId64(botSteamId);

                                this.conn.vm.SteamBindingTokenId = tokenId;
                            });
                        };

                        steamBindingHubProxy.client.onBind = (steamProfileName, steamAvatarHash) => {
                            if (steamAvatarHash === '0000000000000000000000000000000000000000')
                                steamAvatarHash = 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb';

                            $scope.$apply(() => {
                                this.conn.index = 2;
                                this.phase = '连接成功';
                                this.conn.vm.SteamProfileName = steamProfileName;
                                this.conn.vm.AvatarImage = `keylol://steam/avatars/${steamAvatarHash}`;
                            });

                            $timeout(() => {
                                this.phase = '填写表单';
                            }, 2000);
                        };

                        connection.start().fail(() => {
                            this.notification.error('连接失败。');
                            connection.stop();
                        });
                        break;
                }
            });
        }

        submit() {
            this.submitLock = true;

            this.conn.vm.IdCode = this.conn.vm.IdCode.toUpperCase();
            this.$http.post(`${this.apiEndpoint}user`, this.conn.vm)
                .then(response => {
                    this.union.$localStorage.Authorization = response.data.access_token;
                }, response => {
                    switch (response.status) {
                        case 400:
                            this.error = response.data.modelState;
                            this.error['requestDto.UserName'] = this.translate(`userName-${this.utils.modelErrorDetect.UserName(this.error['requestDto.UserName'])}`);
                            this.error['requestDto.Password'] = this.translate(`password-${this.utils.modelErrorDetect.Password(this.error['requestDto.Password'])}`);
                            this.error['requestDto.IdCode'] = this.translate(`idCode-${this.utils.modelErrorDetect.IdCode(this.error['requestDto.IdCode'])}`);
                            break;
                        default:
                            this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    }
                    this.submitLock = false;
                });
        }

        translate(str) {
            switch (str) {
                case 'idCode-format':
                    return '仅限使用字母、数字。';
                case 'idCode-used':
                    return '这个代码已经被别人使用。';
                case 'password-length':
                    return '密码需要至少长 6 位。';
                case 'userName-used':
                    return '这个昵称已被别人使用。';
                case 'userName-format':
                    return '仅限使用字母、数字、汉字。';
                case 'userName-length':
                    return '仅限 3-16 字节。';
                default:
                    return '';
            }
        }
        
        exit() {
            this.close();
        }

        goBack() {
            this.conn.index = 0;
            this.phase = '添加好友';
        }

        goForward() {
            this.conn.index = 1;
            this.phase = '发送验证码';
        }
    }


    keylolApp.controller('RegistrationController', RegistrationController);
}());
