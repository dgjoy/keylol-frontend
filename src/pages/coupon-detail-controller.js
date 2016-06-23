(function () {
    class CouponDetailController {
        constructor ($scope, pageHead, pageLoad, stateTree) {
            pageHead.setTitle('明细 - 文券 - 其乐');
            pageLoad('coupon.detail');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('CouponDetailController', CouponDetailController);
}());
