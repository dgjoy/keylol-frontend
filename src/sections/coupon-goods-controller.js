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

            this.goods = [
                {
                    image: 'keylol://39b7d020df471d6c0e3fa593802000bc.jpg',
                    title: '论坛积分',
                    description: '用文券兑换 60 点蒸汽',
                    detail: '折合国区约 ¥ 100 CNY 的 Steam 钱包卡，可直接用于商店和市场购物。原面额为 $ 15 USD，实际充值金额可能会受汇率波动影响。',
                    remark: '蒸汽会在兑换后直接转入蒸汽动力帐号中',
                    limit: '你在本月还可以兑换 <span>¥ 105</span> CNY 的 Steam 钱包卡，这个额度会随着你文章在当季获得的认可数量增长',
                    price: 47,
                },
                {
                    image: 'keylol://39b7d020df471d6c0e3fa593802000bc.jpg',
                    title: '论坛积分',
                    description: '用文券兑换 100 点蒸汽',
                    detail: '折合国区约 ¥ 100 CNY 的 Steam 钱包卡，可直接用于商店和市场购物。原面额为 $ 15 USD，实际充值金额可能会受汇率波动影响。',
                    remark: '蒸汽会在兑换后直接转入蒸汽动力帐号中',
                    limit: '你在本月还可以兑换 <span>¥ 105</span> CNY 的 Steam 钱包卡，这个额度会随着你文章在当季获得的认可数量增长',
                    price: 77,
                },
                {
                    image: 'keylol://39b7d020df471d6c0e3fa593802000bc.jpg',
                    title: 'Steam 钱包卡',
                    description: '等值于约 ￥100 的钱包兑换码',
                    detail: '折合国区约 ¥ 100 CNY 的 Steam 钱包卡，可直接用于商店和市场购物。原面额为 $ 15 USD，实际充值金额可能会受汇率波动影响。',
                    remark: '蒸汽会在兑换后直接转入蒸汽动力帐号中',
                    limit: '你在本月还可以兑换 <span>¥ 105</span> CNY 的 Steam 钱包卡，这个额度会随着你文章在当季获得的认可数量增长',
                    price: 377,
                },
                {
                    image: 'keylol://39b7d020df471d6c0e3fa593802000bc.jpg',
                    title: 'Steam 钱包卡',
                    description: '等值于约 ￥35 的钱包兑换码',
                    detail: '折合国区约 ¥ 100 CNY 的 Steam 钱包卡，可直接用于商店和市场购物。原面额为 $ 15 USD，实际充值金额可能会受汇率波动影响。',
                    remark: '蒸汽会在兑换后直接转入蒸汽动力帐号中',
                    limit: '你在本月还可以兑换 <span>¥ 105</span> CNY 的 Steam 钱包卡，这个额度会随着你文章在当季获得的认可数量增长',
                    price: 107,
                    saleOut: true,
                },
            ];
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
    });
}());
