(function () {
    class LoginController {
        constructor(close, $http) {
            $.extend(this,{
                close,
                $http,
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
            this.currentPage = 0;
        }

        submit() {
            const $timeout = this.$timeout;
            const apiEndpoint = this.apiEndpoint;
            const $httpParamSerializerJQLike = this.$httpParamSerializerJQLike;
            const $http = this.$http;
            const union = this.union;
            const notification = this.notification;
            const close = this.close;

            const geetest = this.geetest;

            if (this.submitLock)
                return;
            this.submitLock = true;
            this.error = {};
            $timeout(() => {
                if (!this.vm.id_code) {
                    this.error['vm.id_code'] = 'Email or UIC cannot be empty.';
                }
                if (!this.vm.password) {
                    this.error['vm.password'] = 'Password cannot be empty.';
                }
                if (!this.geetestResult) {
                    this.error.authCode = true;
                }
                if (!$.isEmptyObject(this.error)) {
                    this.submitLock = false;
                    return;
                }
                $http.post(`${apiEndpoint}oauth/token`, $httpParamSerializerJQLike(this.vm), {
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
                                this.error.authCode = true;
                                break;
                            case 'user_non_existent':
                                this.error['vm.id_code'] = 'user doesn\'t exist';
                                break;
                            case 'invalid_password':
                                this.error['vm.password'] = 'password is not correct';
                                break;
                            default:
                                notification.error('发生未知错误，请重试或与站务职员联系');
                        }
                    } else {
                        console.log(124);
                        notification.error('发生未知错误，请重试或与站务职员联系', response);
                    }
                    this.geetestResult = null;
                    geetest.refresh().then(this.useGeetestResult);
                    this.submitLock = false;
                });
            });
        };
    }

    keylolApp.controller('LoginController', LoginController);
}());
