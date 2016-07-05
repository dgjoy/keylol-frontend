(function () {
    class SalesTodayController {
        constructor (utils, stateTree, $http, apiEndpoint, $element) {
            $.extend(this, {
                utils,
                stateTree,
                $http,
                apiEndpoint,
                $element,
            });
            this.currentPage = 1;
        }

        expandMore () {
            this.hasBeenExpanded = true;
        }

        scrollToTop() {
            $('html, body').animate({
                scrollTop: this.$element.offset().top - 64,
            }, 500);
        }

        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/entrance/discovery/on-sale-points/?page=${newPage}`).then(response => {
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
