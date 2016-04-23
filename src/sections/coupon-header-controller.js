(function () {
    class CouponHeaderController {
        constructor (union) {
            this.coupon = union.coupon;
        }
    }

    keylolApp.component('couponHeader', {
        templateUrl: 'src/sections/coupon-header.html',
        controller: CouponHeaderController,
        controllerAs: 'couponHeader',
    });
}());
