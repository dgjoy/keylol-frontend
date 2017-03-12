(function () {
    class CouponStoreController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('商店 - 文券 - 其乐');
            pageLoad('coupon.store');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('CouponStoreController', CouponStoreController);
}());
