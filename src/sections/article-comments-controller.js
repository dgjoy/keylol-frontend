(function () {
    class ArticleCommentsController {
        constructor (stateTree, $http, apiEndpoint, $element, $timeout) {
            $.extend(this, {
                stateTree,
                $http,
                apiEndpoint,
                $element,
                $timeout,
            });

            this.currentPage = 1;
            this.vm = {
                content: '',
            };

            this.setCommentsHeight();
        }

        changePage (newPage, oldPage) {
            if (!this.changePageLock) {
                this.changePageLock = true;
                this.$http.get(`${this.apiEndpoint}states/content/article/comments`,{
                    params: {
                        article_id: this.article.id,
                        page: newPage,
                    },
                }).then(response => {
                    this.currentPage = newPage;
                    this.isToNext = newPage > oldPage;
                    this.article.comments = response.data;
                    this.changePageLock = false;
                    this.setCommentsHeight();
                }, response => {
                    this.changePageLock = false;
                });
            }
            return true;
        }

        setCommentsHeight () {
            this.$timeout(() => {
                this.commentsHeight = this.$element.find('.comments>ul').height();
            });
        }
    }

    keylolApp.component('articleComments', {
        templateUrl: 'src/sections/article-comments.html',
        controller: ArticleCommentsController,
        controllerAs: 'articleComments',
        bindings: {
            article: '<',
        },
    });
}());
