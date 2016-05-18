(function () {
    class LatestArticlesController {
        constructor ($http, apiEndpoint) {
            $.extend(this, {
                $http,
                apiEndpoint,
            });
            this.currentPage = 1;
        }

        expandMore () {
            this.hasBeenExpanded = true;
        }
        
        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/entrance/discovery/latest-articles/?page=${newPage}`).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.articles = response.data;
                    this.changePageLock = false;
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }
    }

    keylolApp.component('latestArticles', {
        templateUrl: 'src/sections/latest-articles.html',
        controller: LatestArticlesController,
        controllerAs: 'latestArticles',
        bindings: {
            articles: '<',
            headerImage: '<',
            totalPage: '<',
        },
    });
}());
