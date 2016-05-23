(function () {
    class LatestArticlesController {
        constructor ($http, apiEndpoint, $state, stateTree, utils) {
            $.extend(this, {
                $http,
                apiEndpoint,
                stateTree,
                utils,
            });
            this.currentPage = 1;
            this.headers = {
                entrance: {
                    title: '即刻投稿',
                    subTitle: '让你的文章展现于此',
                },
                point: {
                    title: '收稿箱',
                    subTitle: '投递至这个据点的最新文章',
                },
            };
            const stateName = $state.current.name;
            if (stateName.substr(0,8) === 'entrance') {
                this.type = 'entrance';
            } else {
                this.type = 'point';
            }
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
            theme: '<',
        },
    });
}());
