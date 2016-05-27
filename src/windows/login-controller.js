(function () {
    class LoginController {
        constructor($scope, $http, close, utils, union, apiEndpoint, window,
                    notification, $timeout, $httpParamSerializerJQLike) {
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
            });

            this.tabArray = [
                {
                    name: 'Steam 机器人',
                },
                {
                    name: '网页 API',
                },
                {
                    name: '口令组合',
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
                vm : {
                    grant_type: 'password_captcha',
                    client_id: 'keylol-website',
                    id_code: '',
                    password: '',
                    geetest_challenge: '',
                    geetest_seccode: '',
                    geetest_validate: '',
                },
                state: {
                    id_code: 'normal',
                    password: 'normal',
                },
                tip: {
                    id_code: '',
                    password: '',
                },
                completed: {
                    id_code: false,
                    password: false,
                },
            };

            //监视 vm(id_code, password)
            $scope.$watch(() => {
                return this.passcodeWayManager.vm.id_code;
            },newValue => {
                 switch (this.passcodeWayManager.curPage) {
                     case 0:
                         if (newValue.length === 0) {
                             this.passcodeWayManager.state.id_code = 'normal';
                             this.passcodeWayManager.tip.id_code = '注册时定义的五位代码';
                             this.passcodeWayManager.completed.id_code = false;
                         } else if (!/^[a-zA-Z0-9]{5}$/.test(newValue)) {
                             this.passcodeWayManager.state.id_code = 'warn';
                             this.passcodeWayManager.tip.id_code = 'UIC 只可能是 5 位的字母 / 数字代码';
                             this.passcodeWayManager.completed.id_code = false;
                         } else {
                             this.passcodeWayManager.state.id_code = 'normal';
                             this.passcodeWayManager.tip.id_code = '注册时定义的五位代码';
                             this.passcodeWayManager.completed.id_code = true;
                         }
                         break;
                     case 1:
                         if (newValue.length === 0) {
                             this.passcodeWayManager.state.id_code = 'normal';
                             this.passcodeWayManager.tip.id_code = '请输入ID';
                             this.passcodeWayManager.completed.id_code = false;
                         } else if (newValue.length > 10) {
                             this.passcodeWayManager.state.id_code = 'warn';
                             this.passcodeWayManager.tip.id_code = '还没确定';
                             this.passcodeWayManager.completed.id_code = false;
                         } else {
                             this.passcodeWayManager.state.id_code = 'normal';
                             this.passcodeWayManager.tip.id_code = '请输入ID';
                             this.passcodeWayManager.completed.id_code = true;
                         }
                         break;
                     case 2:
                         if (newValue.length === 0) {
                             this.passcodeWayManager.state.id_code = 'normal';
                             this.passcodeWayManager.tip.id_code = '请输入ID';
                             this.passcodeWayManager.completed.id_code = false;
                         } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(newValue)) {
                             this.passcodeWayManager.state.id_code = 'warn';
                             this.passcodeWayManager.tip.id_code = '错误的邮件格式';
                             this.passcodeWayManager.completed.id_code = false;
                         } else {
                             this.passcodeWayManager.state.id_code = 'normal';
                             this.passcodeWayManager.tip.id_code = '请输入ID';
                             this.passcodeWayManager.completed.id_code = true;
                         }
                         break;
                 }
            });

            $scope.$watch(() => {
                return this.passcodeWayManager.vm.password;
            },newValue => {
                if (newValue.length === 0) {
                    this.passcodeWayManager.state.password = 'normal';
                    this.passcodeWayManager.tip.password = '';
                    this.passcodeWayManager.completed.password = false;
                } else {
                    this.passcodeWayManager.state.password = 'normal';
                    this.passcodeWayManager.tip.password = '';
                    this.passcodeWayManager.completed.password = true;
                }
            });
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
            pwm.vm.id_code = '';
            pwm.vm.password = '';
            pwm.vm.geetest_challenge = '';
            pwm.vm.geetest_seccode = '';
            pwm.vm.geetest_validate = '';

            pwm.state.id_code = 'normal';
            pwm.state.password = 'normal';
            pwm.tip.id_code = ['注册时定义的五位代码','请输入ID','请输入ID'][pwm.curPage];
            pwm.tip.password = '';
            pwm.completed.id_code = false;
            pwm.completed.password = false;

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

                this.$timeout(() => {
                    this.$http.post(`${this.apiEndpoint}oauth/token`, this.$httpParamSerializerJQLike(pwm.vm), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(response => {
                        this.union.$localStorage.Authorization = response.data.access_token;
                        this.notification.success({ message: '登录成功' });
                        this.close();
                    }, response => {
                        if (response.status === 400 && response.data.error) {
                            switch (response.data.error) {
                                case 'user_non_existent':
                                    pwm.tip.id_code = '没有这个用户的注册记录';
                                    pwm.state.id_code = 'warn';
                                    pwm.completed.id_code = false;
                                    break;
                                case 'invalid_password':
                                    pwm.tip.password = '密码有误，留意大写锁定是否开启';
                                    pwm.state.password = 'warn';
                                    pwm.completed.password = false;
                                    break;
                                default:
                                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' });
                            }
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
