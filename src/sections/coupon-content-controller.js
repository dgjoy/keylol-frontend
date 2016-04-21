(function () {
    class CouponContentController {
        constructor ($scope, union, window, utils, $location, $http, notification, $timeout, apiEndpoint) {
            $.extend(this, {
                union,
                window,
                utils,
                $location,
                $http,
                notification,
                $timeout,
                apiEndpoint,
                inviteLink: `https://www.keylol.com/?aff=${union.$localStorage.user.IdCode}`,
                recordPage: {
                    change: (oldPage, newPage) => {
                        this.getCouponLog(newPage);
                    },
                },
                rankPage: {
                    change: (oldPage, newPage) => {
                        this.getCouponRank(newPage);
                    },
                },
                showLock: false,
            });
            $timeout(() => {
                this.page = $location.hash();
                $scope.$watch(() => {
                    return this.page;
                }, newPage => {
                    //noinspection JSValidateTypes
                    if (newPage !== "records" && newPage !== "shop" && newPage !== "ranks" && newPage !== "invite") {
                        this.page = "records";
                    } else {
                        //noinspection JSValidateTypes
                        if (newPage === "records")
                            this.getCouponLog();
                        //noinspection JSValidateTypes
                        if (newPage === "ranks")
                            this.getCouponRank();
                        //noinspection JSValidateTypes
                        if (newPage === "invite")
                            this.getInviteCount();
                        //noinspection JSValidateTypes
                        if (newPage === "shop")
                            this.getCouponGift();
                    }
                });
            });
            union.coupon.setPage = page => {
                this.page = page;
            };
        }
        showShopWindow (id) {
            if (this.showLock) return;
            this.showLock = true;
            this.$http.get(`${this.apiEndpoint}coupon-gift/${id}`).then(response => {
                const item = response.data;
                if (item.Redeemed) {
                    this.window.show({
                        templateUrl: "src/windows/shop-collect.html",
                        controller: "ShopCollectController",
                        inputs: { item },
                    });
                } else {
                    this.window.show({
                        templateUrl: "src/windows/item-preview.html",
                        controller: "ItemPreviewController",
                        inputs: { item },
                    });
                }
                this.showLock = false;
            }, response => {
                this.showLock = false;
                this.notification.error("发生未知错误，请重试或与站务职员联系", response);
            });
        }
        getInviteCount () {
            this.$http.get(`${this.apiEndpoint}user/invited-user-count`).then(response => {
                this.inviteCount = response.data;
            }, response => {
                this.notification.error("发生未知错误，请重试或与站务职员联系", response);
            });
        }
        getCouponRank (page) {
            let skip = 0;
            if (page) {
                skip = (page - 1) * 20;
            }
            if (this.ranks) {
                this.ranks.length = 0;
            }
            this.rankPage.total = 1;
            this.rankPage.curr = 1;

            this.$http.get(`${this.apiEndpoint}user/coupon-rank`, {
                params: {
                    skip,
                    take: 20,
                },
            }).then(response => {
                this.ranks = response.data;
                this.myRank = parseInt(response.headers("X-My-Rank"));
                this.rankPage.total = 5;
                this.rankPage.curr = page || 1;
            }, response => {
                this.notification.error("发生未知错误，请重试或与站务职员联系", response);
            });
        }
        getCouponLog(page) {
            let skip = 0;
            if (page) {
                skip = (page - 1) * 20;
            }
            if (this.records) {
                this.records.length = 0;
            }
            this.recordPage.total = 1;
            this.recordPage.curr = 1;

            this.$http.get(`${this.apiEndpoint}coupon-log`, {
                params: {
                    skip,
                    take: 20,
                },
            }).then(response => {
                this.records = response.data;
                this.recordPage.total = Math.ceil(response.headers("X-Total-Record-Count") / 20);
                this.recordPage.curr = page || 1;
            }, response => {
                this.notification.error("发生未知错误，请重试或与站务职员联系", response);
            });
        }
        getCouponGift() {
            if (this.shopItems) {
                this.shopItems.length = 0;
            }

            this.$http.get(`${this.apiEndpoint}coupon-gift`).then(response => {
                this.shopItems = response.data;
            }, response => {
                this.notification.error("发生未知错误，请重试或与站务职员联系", response);
            });
        }
    }

    keylolApp.component("couponContent", {
        templateUrl: "src/sections/coupon-content.html",
        controller: CouponContentController,
        controllerAs: "couponContent",
    });
}());
