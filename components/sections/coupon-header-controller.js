(function () {
    "use strict";

    keylolApp.controller("CouponHeaderController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.coupon = union.coupon;
        }
    ]);
})();