(function () {
    class ShopLinkController {
        constructor(close, $http, apiEndpoint, utils, notification, window, $timeout) {
            $.extend(this,{
                close,
                $timeout,
                notification,
                apiEndpoint,
                window,
                $http,
            });
            
            this.vm = {};
            this.submitLock = false;
            this.currentStation = 0;

            this.shopLinkError = false;
        }
        
        cancel() {
            const close = this.close;
            
            close();
        }
        
        submit() {
            const close = this.close;
            const $timeout = this.$timeout;
            const notification = this.notification;
            const apiEndpoint = this.apiEndpoint;
            const window = this.window;
            const $http = this.$http;
            
            function checkShopLink(input) {
                const matches = input.match(/^(?:(?:https?:\/\/)?store\.steampowered\.com\/app\/)?(\d+)\/*$/i);
                if (matches) {
                    return parseInt(matches[1]);
                }
                return false;
            }
            
            if (!this.submitLock) {
                this.submitLock = true;
                this.shopLinkError = false;
                $timeout(() => {
                    const appId = checkShopLink(this.vm.shopLink);
                    if (appId) {
                        notification.process('正在抓取商店信息，可能需要几秒的时间');
                        this.currentStation = 1;
                        $http.post(`${apiEndpoint}normal-point/from-app-id`, {}, {
                            params: { appId },
                        }).then(response => {
                            const point = response.data;
                            this.submitLock = false;
                            window.show({
                                templateUrl: 'src/windows/confirmation.html',
                                controller: 'ConfirmationController',
                                controllerAs: 'Confirmation',
                                inputs: { point },
                            });
                            close();
                        }, response => {
                            notification.error('发生未知错误，请重试或与站务职员联系', response);
                            this.submitLock = false;
                        });
                    } else {
                        this.shopLinkError = true;
                        this.submitLock = false;
                    }
                });
            }
        }
    }
    
    keylolApp.controller('ShopLinkController', ShopLinkController);
}());
