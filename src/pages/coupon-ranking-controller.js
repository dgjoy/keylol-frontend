(function () {
    class CouponRankingController {
        constructor($scope, pageHead, pageLoad, stateTree) {
            pageHead.setTitle('排行 - 文券 - 其乐');
            pageLoad('coupon.ranking');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('CouponRankingController', CouponRankingController);
}());
