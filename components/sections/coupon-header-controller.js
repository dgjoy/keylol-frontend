(function () {
    keylolApp.controller("CouponHeaderController", [
        "$scope", "union",
        ($scope, union) => {
            $scope.coupon = union.coupon;
        },
    ]);
}());
