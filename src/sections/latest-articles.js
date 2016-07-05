(function () {
    class LatestArticlesController {
        constructor ($http, apiEndpoint, $state, stateTree, utils, window, $element) {
            $.extend(this, {
                $http,
                apiEndpoint,
                stateTree,
                utils,
                window,
                $element,
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

        scrollToTop() {
            $('html, body').animate({
                scrollTop: this.$element.offset().top - 64,
            }, 500);
        }
        
        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}${this.moduleApi}/?page=${newPage}`,{
                    params: this.requestParams,
                }).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.articles = response.data;
                    this.changePageLock = false;
                    this.scrollToTop();
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }

        newArticle () {
            this.window.show({
                templateUrl: 'src/windows/editor.html',
                controller: 'EditorController',
                controllerAs: 'editor',
                inputs: {
                    options: {},
                },
            });
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
            isEmpty: '<',
            moduleApi: '@',
            requestParams: '<',
        },
    });
}());
