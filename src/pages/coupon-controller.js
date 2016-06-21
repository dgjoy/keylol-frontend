/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class CouponController {
        constructor(pageLoad, $location) {
            if ($location.url().match(/\/coupon\/?$/)) {
                // pageLoad('coupon.detail');
            }
        }
    }
    keylolApp.controller('CouponController', CouponController);
}());