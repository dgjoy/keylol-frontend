(function () {
    class spotlightArticleCardController {}

    keylolApp.component('spotlightArticleCard', {
        templateUrl: 'src/components/spotlight-article-card.html',
        controller: spotlightArticleCardController,
        controllerAs: 'spotlightArticleCard',
        bindings: {
            text: '@',
        },
    });
}());
