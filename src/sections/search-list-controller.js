(function () {
    class SearchListController {
        constructor ($http, apiEndpoint, $state, $stateParams, stateTree, utils, window) {
            $.extend(this, {
                $http,
                apiEndpoint,
                stateTree,
                utils,
                window,
            });
            this.currentPage = 1;
            this.keyword = $stateParams.keyword;

            this.pointSubscribeSet = [
                {
                    text: '订阅',
                    type: 'theme',
                },
                {
                    text: '退订',
                    type: 'light-text',
                },
            ];

            this.subscribe = utils.subscribe;
            this.openRegistration = utils.openRegistration;

            this.searchType = $state.current.name.substr(7);
            switch (this.searchType) {
                case 'point':
                    this.list = stateTree.search.point.results;
                    break;
                case 'article':
                    this.list = stateTree.search.article.results;
                    break;
                case 'user':
                    this.list = stateTree.search.user.results;
                    break;
            }
        }
        
        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}/states/search/${this.searchType}/results`,{
                    params: {
                        page: newPage,
                        keyword: this.keyword,
                    },
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

    keylolApp.component('searchList', {
        templateUrl: 'src/sections/search-list.html',
        controller: SearchListController,
        controllerAs: 'searchList',
        bindings: {
            isEmpty: '<',
        },
    });
}());
