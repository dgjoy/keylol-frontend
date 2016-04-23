(function () {
    class CouponMenuController {
        constructor (union) {
            this.coupon = union.coupon;
        }
    }

    keylolApp.component('couponMenu', {
        templateUrl: 'src/components/coupon-menu.html',
        controller: CouponMenuController,
        controllerAs: 'couponMenu',
        bindings: {
            active: '@',
        },
    });
}());
