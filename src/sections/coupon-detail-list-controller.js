(function () {
    class CouponDetailListController {
        constructor ($http, apiEndpoint) {
            $.extend(this, {
                $http,
                apiEndpoint,
            });
            this.currentPage = 1;
        }

        changePage(newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/coupon/detail/coupon-logs?page=${newPage}`,{
                    params: this.requestParams,
                }).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.list = response.data;
                    console.log(this.list);
                    this.changePageLock = false;
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }

        abs (num) {
            return Math.abs(num);
        }
    }

    keylolApp.component('couponDetailList', {
        templateUrl: 'src/sections/coupon-detail-list.html',
        controller: CouponDetailListController,
        controllerAs: 'couponDetailList',
        bindings: {
            list: '<',
            totalPage: '<',
            object: '<',
        },
    });
}());
