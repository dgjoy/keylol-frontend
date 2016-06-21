(function () {
    class CouponRankingListController {
        constructor () {
            this.totalPage = 5;
            this.currentPage = 1;
            
            this.list = [1,2,3,4,5,6,7,8];
        }

        changePage(newVal, oldVal) {
            this.list = [1,2,3,4,5];
            // if (!this.changePageLock) {
            //     this.changePageLock = true;
            //     this.$http.get(`${this.apiEndpoint}${this.moduleApi}/?page=${newPage}`,{
            //         params: this.requestParams,
            //     }).then(response => {
            //         this.currentPage = newPage;
            //         this.isToNext = newPage > oldPage;
            //         this.list = response.data;
            //         this.changePageLock = false;
            //     }, response => {
            //         this.changePageLock = false;
            //     });
            // }
            // return true;
        }
    }

    keylolApp.component('couponRankingList', {
        templateUrl: 'src/sections/coupon-ranking-list.html',
        controller: CouponRankingListController,
        controllerAs: 'couponRankingList',
    });
}());
