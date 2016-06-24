(function () {
    class LoginController {
        constructor($scope, $http, close, utils, union, apiEndpoint, window,
                    notification, $timeout, $httpParamSerializerJQLike, startPage) {
            $.extend(this,{
                $http,
                union,
                apiEndpoint,
                window,
                notification,
                $timeout,
                $httpParamSerializerJQLike,
                close,
                utils,
                startPage,
            });

            this.tabArray = [
                {
                    name: 'Steam 机器人',
                },
                // {
                //     name: '网页 API',
                // },
                {
                    name: '口令组合',
                },
            ];
            this.currentWay = startPage;
            this.swapDirection = 'init';

            //robot
            this.steamRobotWayManager = {
                phaseIndex: 0,
                code: '',
            };
            const connection = $.connection.new();
            const steamLoginHubProxy = connection.steamLoginHub;

            steamLoginHubProxy.client.onLoginOneTimeToken = (token, userName, avatarImage) => {
                // 用户在 Steam 输入验证码并输入正确后，服务器会通过这个方法通知浏览器，token 是登录用的 one-time token
                $scope.$apply(() => {
                    $http.post(`${apiEndpoint}oauth/token`, $httpParamSerializerJQLike({
                        token,
                        grant_type: 'one_time_token',
                        client_id: 'keylol-website',
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        connection.stop();
                        this.steamRobotWayManager.avatarImage = avatarImage;
                        this.steamRobotWayManager.userName = userName;
                        this.steamRobotWayManager.phaseIndex = 1;
                        $timeout(() => {
                            notification.success({ message: '登录成功，欢迎回到其乐' });
                            union.$localStorage.Authorization = response.data.access_token;
                        }, 5000);
                    }, response => {
                        if (response.status === 400 && response.data.error) {
                            switch (response.data.error) {
                                case 'invalid_token':
                                    notification.error({ message: 'Steam Id 无效' });
                                    break;
                                case 'user_non_existent':
                                    notification.error({ message: '用户不存在' });
                                    break;
                                case 'account_locked_out':
                                    notification.error({ message: '用户登录次数过多，暂时被锁定' });
                                    break;
                                default:
                                    notification.error({ message: '发生未知错误，请重试或与站务职员联系' });
                            }
                        } else {
                            notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                        }
                        connection.stop();
                    });
                });
            };

            steamLoginHubProxy.client.onCode = code => {
                // code 是收到的四位数字 Steam 登录验证码
                $scope.$apply(() => {
                    this.steamRobotWayManager.code = code;
                });
            };

            connection.start().fail(() => {
                notification.error({ message: '连接失败' });
                connection.stop();
            });



            //api
            this.apiWayManager = {
                phaseIndex: 1,
            };

            

            //passcode 方式
            this.passcodeWayManager = {
                swapDirection: 'init',
                tabArray: [{
                    name: '识别码',
                }, {
                    name: '昵称',
                }, {
                    name: '电邮',
                }],
                curPage: 0,
                forms: [[
                    { label: '用户识别码', type: 'uic' ,tip:'注册时定义的五位代码' },
                    { label: '登录口令', type: 'password' },
                ], [
                    { label: '昵称', type: 'text', tip:'请输入昵称' },
                    { label: '登录口令', type: 'password' },
                ], [
                    { label: '电邮地址', type: 'text', tip:'请输入邮件' },
                    { label: '登录口令', type: 'password' },
                ]],
                errorDetect: utils.modelErrorDetect,
                vm : {
                    grant_type: 'password_captcha',
                    client_id: 'keylol-website',
                    id_code: '',
                    password: '',
                    geetest_challenge: '',
                    geetest_seccode: '',
                    geetest_validate: '',
                },
                id_code: {
                    state: 'normal',
                    error: '',
                    completed: '',
                },
                password: {
                    state: 'normal',
                    error: '',
                    completed: '',
                },
                state: {
                    id_code: 'normal',
                    password: 'normal',
                },
            };
            if (this.currentWay === 1) {
                this.resetPasscode();
            }

            //监视 vm(id_code, password)
            $scope.$watch(() => {
                return this.passcodeWayManager.vm.id_code;
            },newValue => {
                 switch (this.passcodeWayManager.curPage) {
                     case 0:
                         if (newValue.length === 0) {
                             this.passcodeWayManager.id_code.state = 'normal';
                             this.passcodeWayManager.id_code.completed = false;
                         } else if (!/^[a-zA-Z0-9]{5}$/.test(newValue)) {
                             this.passcodeWayManager.id_code.state = 'warn';
                             this.passcodeWayManager.id_code.error = 'UIC 只可能是 5 位的字母 / 数字代码';
                             this.passcodeWayManager.id_code.completed = false;
                         } else {
                             this.passcodeWayManager.id_code.state = 'normal';
                             this.passcodeWayManager.id_code.completed = true;
                         }
                         break;
                     case 1:
                         if (newValue.length === 0) {
                             this.passcodeWayManager.id_code.state = 'normal';
                             this.passcodeWayManager.id_code.completed = false;
                         }  else {
                             this.passcodeWayManager.id_code.state = 'normal';
                             this.passcodeWayManager.id_code.completed = true;
                         }
                         break;
                     case 2:
                         if (newValue.length === 0) {
                             this.passcodeWayManager.id_code.state = 'normal';
                             this.passcodeWayManager.id_code.completed = false;
                         } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(newValue)) {
                             this.passcodeWayManager.id_code.state = 'warn';
                             this.passcodeWayManager.id_code.error = '邮箱格式错误';
                             this.passcodeWayManager.id_code.completed = false;
                         } else {
                             this.passcodeWayManager.id_code.state = 'normal';
                             this.passcodeWayManager.id_code.completed = true;
                         }
                         break;
                 }
            });

            $scope.$watch(() => {
                return this.passcodeWayManager.vm.password;
            },newValue => {
                if (newValue.length === 0) {
                    this.passcodeWayManager.password.state = 'normal';
                    this.passcodeWayManager.password.completed = false;
                } else {
                    this.passcodeWayManager.password.state = 'normal';
                    this.passcodeWayManager.password.completed = true;
                }
            });
        }

        openRegistration () {
            this.utils.openRegistration();
            this.close();
        }

        changeWay(index) {
            if (index > this.currentWay) {
                this.swapDirection = 'left';
            } else if (index < this.currentWay) {
                this.swapDirection = 'right';
            }

            this.currentWay = index;
            switch (this.currentWay) {
                case 0:
                    break;
                case 1:
                    this.passcodeWayManager.swapDirection = 'init';
                    this.passcodeWayManager.curPage = 0;
                    this.resetPasscode();
                    break;
                default:
                    break;
            }
        }

        changePasscodeWay(index) {
            if (index > this.passcodeWayManager.curPage) {
                this.passcodeWayManager.swapDirection = 'left';
            } else if (index < this.passcodeWayManager.curPage) {
                this.passcodeWayManager.swapDirection = 'right';
            }

            // 切换 passcode 的内部方式时
            this.passcodeWayManager.curPage = index;
            this.resetPasscode();
        }

        resetPasscode() {
            const pwm = this.passcodeWayManager;
            pwm.vm.id_code = '';
            pwm.vm.password = '';
            pwm.vm.geetest_challenge = '';
            pwm.vm.geetest_seccode = '';
            pwm.vm.geetest_validate = '';

            pwm.id_code.state = 'normal';
            pwm.password.state = 'normal';
            pwm.id_code.completed = false;
            pwm.password.completed = false;
        }
        
        submit () {
            const pwm = this.passcodeWayManager;
            
            const submitObj = $.extend({},this.passcodeWayManager.vm,true);
            const cont = submitObj.id_code;
            delete submitObj.id_code;
            submitObj[['id_code','user_name','email'][this.passcodeWayManager.curPage]] = cont;

            console.log(submitObj);

            this.submitLock = true;
            this.$http.post(`${this.apiEndpoint}oauth/token`, this.$httpParamSerializerJQLike(submitObj), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(response => {
                this.union.$localStorage.Authorization = response.data.access_token;
                this.notification.success({ message: '登录成功' });
                this.close(true);
            }, response => {
                this.window.show({
                    templateUrl: 'src/windows/geetest.html',
                    controller: 'GeetestController',
                    controllerAs: 'geetest',
                }).then(window => {
                    return window.close;
                }).then(result => {
                    // 登录失败的时候, 尝试使用极验
                    submitObj.geetest_challenge = result.geetest_challenge;
                    submitObj.geetest_seccode = result.geetest_seccode;
                    submitObj.geetest_validate = result.geetest_validate;
                    this.$http.post(`${this.apiEndpoint}oauth/token`, this.$httpParamSerializerJQLike(submitObj), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        this.union.$localStorage.Authorization = response.data.access_token;
                        this.notification.success({ message: '登录成功' });
                        this.close(true);
                    },response => {
                        if (response.status === 400 && response.data.error) {
                            switch (response.data.error) {
                                case 'user_non_existent':
                                    pwm.id_code.error = '没有这个用户的注册记录';
                                    pwm.id_code.state = 'warn';
                                    pwm.id_code.completed = false;
                                    break;
                                case 'invalid_password':
                                    pwm.password.error = '密码有误，留意大写锁定是否开启';
                                    pwm.password.state = 'warn';
                                    pwm.password.completed = false;
                                    break;
                                case 'account_locked_out':
                                    pwm.password.error = '账户被锁定';
                                    pwm.password.state = 'warn';
                                    pwm.password.completed = false;
                                    break;
                                default:
                                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                            }
                        }
                        this.submitLock = false;
                    });
                });
            });
        }
    }

    keylolApp.controller('LoginController', LoginController);
}());
