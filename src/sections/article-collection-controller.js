(function () {
    class ArticleCollectionController {
        constructor () {
            this.type = {
                mainTitle: '据点文集',
                subTitle: '来稿文章中的热门和精华',
            };
        }
    }

    keylolApp.component('articleCollection', {
        templateUrl: 'src/sections/article-collection.html',
        controller: ArticleCollectionController,
        controllerAs: 'articleCollection',
        bindings: {
            theme: '<',
            cards: '<',
        },
    });
}());
