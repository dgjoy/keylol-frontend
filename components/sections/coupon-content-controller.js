(function () {
    "use strict";

    keylolApp.controller("CouponContentController", [
        "$scope", "union", "window", "utils", "$location", "$http",
        function ($scope, union, window, utils, $location, $http) {
            $scope.union = union;
            $scope.page = $location.hash();
            $scope.$watch("page", function (newPage) {
                //noinspection JSValidateTypes
                if(newPage !== "records" && newPage !== "ranks" && newPage !== "invite" ){
                    $scope.page = "records";
                }else if(newPage === "records"){
                    getCouponLog();
                }else if(newPage === "ranks"){
                    getCouponRank();
                }
            });
            $scope.setPage = function (page) {
                $scope.page = page;
            };
            union.coupon.setPage = $scope.setPage;
            $scope.inviteLink = "https://www.keylol.com/?i=" + union.$localStorage.user.IdCode;

            $scope.recordPage = {
                change: function (oldPage, newPage) {
                    getCouponLog(newPage);
                }
            };
            $scope.rankPage = {
                change: function (oldPage, newPage) {
                    getCouponRank(newPage);
                }
            };

            function getCouponRank(page) {
                var skip = 0;
                if(page){
                    skip = (page - 1) * 20
                }
                if($scope.ranks){
                    $scope.ranks.length = 0;
                }
                $scope.rankPage.total = 1;
                $scope.rankPage.curr = 1;

                $http.get(apiEndpoint + "user/coupon-rank", {
                    params: {
                        take: 20,
                        skip: skip
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.ranks = response.data;
                    $scope.myRank = response.headers("X-Total-Record-Count");
                    $scope.rankPage.total = 5;
                    $scope.rankPage.curr = page || 1;
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

            function getCouponLog(page) {
                var skip = 0;
                if(page){
                    skip = (page - 1) * 20
                }
                if($scope.records){
                    $scope.records.length = 0;
                }
                $scope.recordPage.total = 1;
                $scope.recordPage.curr = 1;

                $http.get(apiEndpoint + "coupon-log", {
                    params: {
                        take: 20,
                        skip: skip
                    }
                }).then(function (response) {
                    $scope.records = response.data;
                    $scope.recordPage.total = Math.ceil(response.headers("X-Total-Record-Count")/20);
                    $scope.recordPage.curr = page || 1;
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }
        }
    ]);
})();