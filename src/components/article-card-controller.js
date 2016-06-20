(function () {
    class ArticleCardController {}

    keylolApp.component('articleCard', {
        templateUrl: 'src/components/article-card.html',
        controller: ArticleCardController,
        controllerAs: 'articleCard',
        bindings: {
            card: '<',
        },
    });
}());
