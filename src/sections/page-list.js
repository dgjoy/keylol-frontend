(function () {
    class PageListController {
        constructor ($http, apiEndpoint, stateTree, utils) {
            $.extend(this, {
                $http,
                apiEndpoint,
                stateTree,
                utils,
            });
            this.currentPage = 1;
            if (this.expanded) {
                this.hasBeenExpanded = true;
            }

            this.subscribeSet = [
                {
                    text: '关注',
                    type: this.type,
                },
                {
                    text: '取关',
                    type: 'light-text',
                },
            ];

            this.subscribe = utils.subscribe;
            this.openRegistration = utils.openRegistration;
        }

        expandMore () {
            this.hasBeenExpanded = true;
        }
        
        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}${this.moduleApi}/?page=${newPage}`,{
                    params: this.requestParams,
                }).then(response => {
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

    keylolApp.component('pageList', {
        templateUrl: 'src/sections/page-list.html',
        controller: PageListController,
        controllerAs: 'pageList',
        bindings: {
            expanded: '<',
            list: '<',
            totalPage: '<',
            theme: '<',
            moduleApi: '@',
            requestParams: '<',
        },
    });
}());
