(function () {
    class SpotlightArticleCardController {}

    keylolApp.component('spotlightArticleCard', {
        templateUrl: 'src/components/spotlight-article-card.html',
        controller: SpotlightArticleCardController,
        controllerAs: 'spotlightArticleCard',
        bindings: {
            card: '<',
            noUserHeader: '<',
            authorIdCode: '<',
        },
    });
}());
