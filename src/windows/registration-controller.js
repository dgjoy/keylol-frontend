(function () {
    class RegistrationController {
        constructor(close, $scope, $timeout, notification, $http, utils, union, $q, apiEndpoint, $httpParamSerializerJQLike, $location, $state, window) {
            $.extend(this,{
                close,
                notification,
                $http,
                utils,
                union,
                apiEndpoint,
                $httpParamSerializerJQLike,
                $location,
                $state,
                window,
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

            $scope.$on('$destroy', () => {
                connection.stop();
            });

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

                                this.conn.index = 0;
                                this.phase = '添加好友';
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

            if (this.$location.search().aff) {
                this.conn.vm.inviterIdCode = this.$location.search().aff;
            } else if (this.$state.current.name === 'content.article' || this.$state.current.name === 'content.activity') {
                this.conn.vm.inviterIdCode = this.$state.params.author_id_code;
            }

            this.$http.post(`${this.apiEndpoint}user`, this.conn.vm)
                .then(response => {
                    this.union.$localStorage.firstOpenKeylol = true;

                    this.$http.post(`${this.apiEndpoint}oauth/token`, this.$httpParamSerializerJQLike({
                        token: response.data,
                        grant_type: 'one_time_token',
                        client_id: 'keylol-website',
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        this.union.$localStorage.Authorization = response.data.access_token;
                        this.notification.success('登录成功，欢迎回到其乐');
                        this.close();
                    }, response => {
                        if (response.status === 400 && response.data.error) {
                            switch (response.data.error) {
                                case 'invalid_token':
                                    this.notification.error({ mesage: 'Steam Id 无效' });
                                    break;
                                case 'user_non_existent':
                                    this.notification.error({ message: '用户不存在' });
                                    break;
                                case 'account_locked_out':
                                    this.notification.error({ message: '用户登录次数过多，暂时被锁定' });
                                    break;
                                default:
                                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' });
                            }
                        } else {
                            this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        }
                        this.close();
                    });
                }, response => {
                    switch (response.status) {
                        case 400:
                            this.error = {};
                            this.error['requestDto.UserName'] = this.translate(response.data.modelState['requestDto.UserName']);
                            this.error['requestDto.Password'] = this.translate(response.data.modelState['requestDto.Password']);
                            this.error['requestDto.IdCode'] = this.translate(response.data.modelState['requestDto.IdCode']);
                            break;
                        default:
                            this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                    }
                    this.submitLock = false;
                });
        }

        translate(str) {
            if (str === undefined) {
                return str;
            }

            switch (str[0]) {
                case 'required':
                case 'password_all_whitespace':
                    return '必填。';
                case 'invalid_id_code':
                    return '仅限使用字母、数字。';
                case 'id_code_reserved':
                    return '识别码已被预留。';
                case 'id_code_used':
                    return '这个代码已经被别人使用。';
                case 'password_too_short':
                    return '密码需要至少长 6 位。';
                case 'user_name_used':
                    return '这个昵称已被别人使用。';
                case 'user_name_invalid_character':
                    return '仅限使用字母、数字、汉字。';
                case 'user_name_invalid_length':
                    return '仅限 3-16 字节。';
                default:
                    return '未知错误。';
            }
        }

        openLogin () {
            this.window.show({
                templateUrl: 'src/windows/login.html',
                controller: 'LoginController',
                controllerAs: 'login',
                inputs: {
                    startPage: 0,
                },
            });
            this.close();
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
