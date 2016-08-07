(function () {
    class CouponGoodsController {
        constructor (window) {
            $.extend(this,{
                window,
            });

            this.header = {
                mainTitle: '文券商店',
                subTitle: '凭借文券兑换对应商品',
            };
        }

        showWindow(good, event) {
            this.window.show({
                event,
                templateUrl: 'src/windows/good-detail.html',
                controller: 'GoodDetailController',
                controllerAs: 'goodDetail',
                inputs: {
                    good,
                },
            });
        }
    }

    keylolApp.component('couponGoods', {
        templateUrl: 'src/sections/coupon-goods.html',
        controller: CouponGoodsController,
        controllerAs: 'couponGoods',
        bindings: {
            goods: '<',
        },
    });
}());
