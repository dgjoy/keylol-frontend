(function () {
    class SpotlightArticleCardController {
        constructor (union) {
            this.union = union;
        }
    }

    keylolApp.component('spotlightArticleCard', {
        templateUrl: 'src/components/spotlight-article-card.html',
        controller: SpotlightArticleCardController,
        controllerAs: 'spotlightArticleCard',
        bindings: {
            text: '@',
        },
    });
}());
