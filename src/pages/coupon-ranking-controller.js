(function () {
    class CouponRankingController {
        constructor($scope, pageHead, pageLoad, stateTree) {
            pageHead.setTitle('文券排行 - 其乐');
            pageLoad('coupon.ranking');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('CouponRankingController', CouponRankingController);
}());
