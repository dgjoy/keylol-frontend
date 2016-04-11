(function () {
    "use strict";

    keylolApp.controller("CouponContentController", [
        "$scope", "union", "window", "utils", "$location", "$http", "notification", "$timeout",
        function ($scope, union, window, utils, $location, $http, notification, $timeout) {
            $scope.union = union;
            $timeout(function () {
                $scope.page = $location.hash();
                $scope.$watch("page", function (newPage) {
                    //noinspection JSValidateTypes
                    if (newPage !== "records" && newPage !== "shop" && newPage !== "ranks" && newPage !== "invite") {
                        $scope.page = "records";
                    } else {
                        //noinspection JSValidateTypes
                        if (newPage === "records")
                            getCouponLog();
                        //noinspection JSValidateTypes
                        if (newPage === "ranks")
                            getCouponRank();
                        //noinspection JSValidateTypes
                        if (newPage === "invite")
                            getInviteCount();
                        //noinspection JSValidateTypes
                        if (newPage === "shop")
                            getCouponGift();
                    }
                });
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

            var showLock = false;
            $scope.showShopWindow = function (id) {
                if(showLock) return;
                showLock = true;
                $http.get(apiEndpoint + "coupon-gift/" + id).then(function (response) {
                    var item = response.data;
                    if(item.Redeemed){
                        window.show({
                            templateUrl: "components/windows/shop-collect.html",
                            controller: "ShopCollectController",
                            inputs: {
                                item: item
                            }
                        });
                    }else {
                        window.show({
                            templateUrl: "components/windows/item-preview.html",
                            controller: "ItemPreviewController",
                            inputs: {
                                item: item
                            }
                        });
                    }
                    showLock = false;
                }, function (response) {
                    showLock = false;
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
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
                if (page) {
                    skip = (page - 1) * 20
                }
                if ($scope.ranks) {
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
                if (page) {
                    skip = (page - 1) * 20
                }
                if ($scope.records) {
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
                    $scope.recordPage.total = Math.ceil(response.headers("X-Total-Record-Count") / 20);
                    $scope.recordPage.curr = page || 1;
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

            function getCouponGift() {
                if ($scope.shopItems) {
                    $scope.shopItems.length = 0;
                }

                $http.get(apiEndpoint + "coupon-gift").then(function (response) {
                    $scope.shopItems = response.data;
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }
        }
    ]);
})();