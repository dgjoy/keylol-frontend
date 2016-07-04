(function () {
    class CouponDetailController {
        constructor ($scope, pageHead, pageLoad, stateTree) {
            pageHead.setTitle('文券明细 - 其乐');

            pageLoad('coupon.detail');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('CouponDetailController', CouponDetailController);
}());
