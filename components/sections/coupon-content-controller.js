(function () {
    keylolApp.controller("CouponContentController", [
        "$scope", "union", "window", "utils", "$location", "$http", "notification", "$timeout",
        ($scope, union, window, utils, $location, $http, notification, $timeout) => {
            $scope.union = union;
            $timeout(() => {
                $scope.page = $location.hash();
                $scope.$watch("page", newPage => {
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
            $scope.inviteLink = `https://www.keylol.com/?aff=${union.$localStorage.user.IdCode}`;

            $scope.recordPage = {
                change (oldPage, newPage) {
                    getCouponLog(newPage);
                },
            };
            $scope.rankPage = {
                change (oldPage, newPage) {
                    getCouponRank(newPage);
                },
            };

            let showLock = false;
            $scope.showShopWindow = function (id) {
                if (showLock) return;
                showLock = true;
                $http.get(`${apiEndpoint}coupon-gift/${id}`).then(response => {
                    const item = response.data;
                    if (item.Redeemed) {
                        window.show({
                            templateUrl: "components/windows/shop-collect.html",
                            controller: "ShopCollectController",
                            inputs: { item },
                        });
                    } else {
                        window.show({
                            templateUrl: "components/windows/item-preview.html",
                            controller: "ItemPreviewController",
                            inputs: { item },
                        });
                    }
                    showLock = false;
                }, response => {
                    showLock = false;
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            };

            function getInviteCount() {
                $http.get(`${apiEndpoint}user/invited-user-count`).then(response => {
                    $scope.inviteCount = response.data;
                }, response => {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

            function getCouponRank(page) {
                let skip = 0;
                if (page) {
                    skip = (page - 1) * 20;
                }
                if ($scope.ranks) {
                    $scope.ranks.length = 0;
                }
                $scope.rankPage.total = 1;
                $scope.rankPage.curr = 1;

                $http.get(`${apiEndpoint}user/coupon-rank`, {
                    params: {
                        skip,
                        take: 20,
                    },
                }).then(response => {
                    $scope.ranks = response.data;
                    $scope.myRank = parseInt(response.headers("X-My-Rank"));
                    $scope.rankPage.total = 5;
                    $scope.rankPage.curr = page || 1;
                }, response => {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

            function getCouponLog(page) {
                let skip = 0;
                if (page) {
                    skip = (page - 1) * 20;
                }
                if ($scope.records) {
                    $scope.records.length = 0;
                }
                $scope.recordPage.total = 1;
                $scope.recordPage.curr = 1;

                $http.get(`${apiEndpoint}coupon-log`, {
                    params: {
                        skip,
                        take: 20,
                    },
                }).then(response => {
                    $scope.records = response.data;
                    $scope.recordPage.total = Math.ceil(response.headers("X-Total-Record-Count") / 20);
                    $scope.recordPage.curr = page || 1;
                }, response => {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

            function getCouponGift() {
                if ($scope.shopItems) {
                    $scope.shopItems.length = 0;
                }

                $http.get(`${apiEndpoint}coupon-gift`).then(response => {
                    $scope.shopItems = response.data;
                }, response => {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }
        },
    ]);
}());
