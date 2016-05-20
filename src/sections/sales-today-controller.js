(function () {
    class SalesTodayController {
        constructor (utils, stateTree) {
            $.extend(this, {
                utils,
                stateTree,
            });
            this.currentPage = 1;
        }

        expandMore () {
            this.hasBeenExpanded = true;
        }

        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/entrance/discovery/on-sale-points/?page=${newPage}`).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.list = response.data;
                    this.changePageLock = false;
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }
    }

    keylolApp.component('salesToday', {
        templateUrl: 'src/sections/sales-today.html',
        controller: SalesTodayController,
        controllerAs: 'salesToday',
        bindings: {
            list: '<',
            headerImage: '<',
            totalPage: '<',
        },
    });
}());
