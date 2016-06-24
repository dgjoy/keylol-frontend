(function () {
    class ShopCollectController {
        constructor(close, $http, apiEndpoint, notification, union, item, $state) {
            $.extend(this,{
                close,
                $http,
                apiEndpoint,
                notification,
                $state,
            });

            this.item = item;
            this.vm = {};

            if (item.Redeemed) {
                this.disabled = true;
                this.vm = item.Extra;
                for (let i = 0;i < item.AcceptedFields.length;i++) {
                    if (item.AcceptedFields[i].InputType === 'number') {
                        this.vm[item.AcceptedFields[i].Id] = parseInt(this.vm[item.AcceptedFields[i].Id]);
                    }
                }
            }

            this.submitLock = false;
        }

        cancel() {
            const close = this.close;

            close();
        }

        submit() {
            const $http = this.$http;
            const apiEndpoint = this.apiEndpoint;
            const close = this.close;
            const $state = this.$state;
            const notification = this.notification;

            if (this.submitLock || this.disabled) return;

            this.submitLock = true;
            $http.post(`${apiEndpoint}coupon-gift-order`, this.vm, {
                params: { giftId: this.item.Id },
            }).then(() => {
                close();
                $state.reload();
                notification.success('商品兑换成功，文券已被扣除。');
            }, response => {
                if (response.status === 404) {
                    notification.error('指定文券礼品不存在');
                } else {
                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                }
                this.submitLock = false;
            });
        }
    }

    keylolApp.controller('ShopCollectController', ShopCollectController);
}());
