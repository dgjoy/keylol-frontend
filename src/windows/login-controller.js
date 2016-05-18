(function () {
    class LoginController {
        constructor($scope, $http, close, utils, union, apiEndpoint, window,
                    $element, $timeout, $httpParamSerializerJQLike) {
            $.extend(this,{
                $http,
                union,
                apiEndpoint,
                window,
                $timeout,
                $httpParamSerializerJQLike,
                close,
                utils,
            });

            this.tabArray = [
                {
                    name: 'Steam 机器人',
                    click: () => {
                    },
                },
                {
                    name: '网页 API',
                    click: () => {
                    },
                },
                {
                    name: '口令组合',
                    click: () => {
                    },
                },
            ];
            this.currentWay = 0;
            this.swapDirection = 'init';

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
                    { label: '用户识别码', type: 'uic' },
                    { label: '登录口令', type: 'password' },
                ], [
                    { label: '昵称', type: 'text' },
                    { label: '登录口令', type: 'password' },
                ], [
                    { label: '电邮地址', type: 'text' },
                    { label: '登录口令', type: 'password' },
                ]],
                errorDetect: utils.modelErrorDetect,
            };
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
                    break;
                case 2:
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
            pwm.vm = {
                grant_type: 'password_captcha',
                client_id: 'keylol-website',
                id_code: '',
                password: '',
                geetest_challenge: '',
                geetest_seccode: '',
                geetest_validate: '',
            };
            pwm.error = {};

            const geetest = this.utils.createGeetest('popup');
            geetest.ready.then(gee => {
                this.$timeout(() => {
                    gee.bindOn(`#popup-geetest-${geetest.id}`);
                    gee.appendTo(`#geetest-${geetest.id}`);
                });
            });
            pwm.geetestResult = null;
            pwm.geetestId = geetest.id;

            const useGeetestResult = gee => {
                pwm.geetestResult = gee.getValidate();
                pwm.vm.geetest_challenge = pwm.geetestResult.geetest_challenge;
                pwm.vm.geetest_seccode = pwm.geetestResult.geetest_seccode;
                pwm.vm.geetest_validate = pwm.geetestResult.geetest_validate;

                pwm.error = {};
                this.$timeout(() => {
                    if (!pwm.vm.id_code) {
                        pwm.error['vm.id_code'] = 'Email or UIC cannot be empty.';
                    }
                    if (!pwm.vm.password) {
                        pwm.error['vm.password'] = 'Password cannot be empty.';
                    }
                    if (!pwm.geetestResult) {
                        pwm.error.authCode = true;
                    }
                    this.$http.post(`${this.apiEndpoint}oauth/token`, this.$httpParamSerializerJQLike(pwm.vm), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        this.union.$localStorage.Authorization = response.data.access_token;
                        console.log('登录成功');
                        this.close();
                    }, response => {
                        if (response.status === 400 && response.data.error) {
                            switch (response.data.error) {
                                case 'invalid_captcha':
                                    pwm.error.authCode = true;
                                    break;
                                case 'user_non_existent':
                                    pwm.error['vm.id_code'] = 'user doesn\'t exist';
                                    break;
                                case 'invalid_password':
                                    pwm.error['vm.password'] = 'password is not correct';
                                    break;
                                default:
                                    console.log('发生未知错误，请重试或与站务职员联系');
                            }
                            console.log(response.data.error);
                        } else {
                            console.log(124);
                        }
                        pwm.geetestResult = null;
                        geetest.refresh().then(useGeetestResult);
                    });
                });
            };
            geetest.success.then(useGeetestResult);
        }
    }

    keylolApp.controller('LoginController', LoginController);
}());
