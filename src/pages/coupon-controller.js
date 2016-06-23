/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class CouponController {
        constructor($location, $state) {
            if ($location.url().match(/\/coupon\/?$/)) {
                $state.go('.detail');
            }
        }
    }
    keylolApp.controller('CouponController', CouponController);
}());