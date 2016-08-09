(function () {
    class GoodDetailController {
        constructor(close, good, stateTree, $http, apiEndpoint, notification, $state, $timeout) {
            $.extend(this,{
                close,
                good,
                stateTree,
                $http,
                apiEndpoint,
                notification,
                $state,
                $timeout,
            });

            switch (good.type) {
                case 'steamCnCredit':
                    if (!good.steamCnUid) {
                        this.submitDisabled = true;
                    }
                    break;
                case 'steamGiftCard':
                    if (!good.email) {
                        this.submitDisabled = true;
                    }
                    break;
            }

            if (good.value > good.credit && good.price > stateTree.currentUser.coupon) {
                this.submitDisabled = true;
            }
        }

        submit () {
            if (this.submitDisabled) return;

            this.submitDisabled = true;
            this.$http.post(`${this.apiEndpoint}coupon-gift-order`, {}, {
                params: {
                    giftId: this.good.id,
                },
            }).then(() => {
                if (this.good.type === 'steamCnCredit') {
                    this.submitSuccess('兑换成功，蒸汽已发放');
                } else {
                    this.submitSuccess();
                }
            }, response => {
                if (response.status === 404) {
                    this.notification.error({ message: '指定文券商品不存在' });
                } else if (response.status === 400) {
                    switch (response.data.modelState.giftId) {
                        case 'not_enough_coupon':
                            this.notification.error({ message: '文券不足' });
                            break;
                        case 'not_enough_credit':
                            this.notification.error({ message: '当月可以兑换的额度不足' });
                            break;
                        case 'gift_off_the_market':
                            this.notification.error({ message: '商品已下架' });
                            break;
                        case 'email_non_existent':
                            this.notification.error({ message: '用户没有 Email' });
                            break;
                        case 'steamcn_account_not_bound':
                            this.notification.error({ message: '用户没有绑定 SteamCN 账户' });
                            break;
                        default:
                            if (this.good.type === 'steamCnCredit') {
                                this.submitSuccess();
                            } else {
                                this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                            }
                    }
                } else {
                    this.notification.error({ message: '发生未知错误，请重试或与站务职员联系' }, response);
                }
                this.submitDisabled = false;
            });
        }

        submitSuccess (message = '兑换成功') {
            this.notification.success({ message });

            this.$timeout(() => {
                this.close();
                this.$state.reload();
            }, 2000);
        }
    }
    keylolApp.controller('GoodDetailController', GoodDetailController);
}());
