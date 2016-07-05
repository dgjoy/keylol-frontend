(function () {
    class CouponRankingListController {
        constructor ($http, apiEndpoint, $element) {
            $.extend(this, {
                $http,
                apiEndpoint,
                $element,
            });
            this.currentPage = 1;
        }

        scrollToTop() {
            $('html, body').animate({
                scrollTop: this.$element.offset().top - 64,
            }, 500);
        }

        changePage(newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/coupon/ranking/ranking-users/?page=${newPage}`,{
                    params: this.requestParams,
                }).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.list = response.data;
                    this.changePageLock = false;
                    this.scrollToTop();
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }
    }

    keylolApp.component('couponRankingList', {
        templateUrl: 'src/sections/coupon-ranking-list.html',
        controller: CouponRankingListController,
        controllerAs: 'couponRankingList',
        bindings: {
            list: '<',
            object: '<',
        },
    });
}());
