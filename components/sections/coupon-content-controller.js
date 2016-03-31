(function () {
    "use strict";

    keylolApp.controller("CouponContentController", [
        "$scope", "union", "window", "utils", "$location", "$http", "notification",
        function ($scope, union, window, utils, $location, $http, notification) {
            $scope.union = union;
            $scope.page = $location.hash();
            $scope.$watch("page", function (newPage) {
                //noinspection JSValidateTypes
                if(newPage !== "records" && newPage !== "ranks" && newPage !== "invite" ){
                    $scope.page = "records";
                }else {
                    //noinspection JSValidateTypes
                    if(newPage === "records")
                        getCouponLog();
                    //noinspection JSValidateTypes
                    if(newPage === "ranks")
                        getCouponRank();
                    //noinspection JSValidateTypes
                    if(newPage === "invite")
                        getInviteCount();
                }
            });
            $scope.setPage = function (page) {
                $scope.page = page;
            };
            union.coupon.setPage = $scope.setPage;
            $scope.inviteLink = "https://www.keylol.com/?aff=" + union.$localStorage.user.IdCode;

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

            function getInviteCount() {

                $http.get(apiEndpoint + "user/invited-user-count").then(function (response) {
                    $scope.inviteCount = response.data;
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

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
                    $scope.ranks = response.data;
                    $scope.myRank = response.headers("X-My-Rank");
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