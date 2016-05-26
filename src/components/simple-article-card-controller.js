(function () {
    class SimpleArticleCardController {}

    keylolApp.component('simpleArticleCard', {
        templateUrl: 'src/components/simple-article-card.html',
        controller: SimpleArticleCardController,
        controllerAs: 'simpleArticleCard',
        bindings: {
            card: '<',
        },
    });
}());
