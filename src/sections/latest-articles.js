(function () {
    class LatestArticlesController {}

    keylolApp.component('latestArticles', {
        templateUrl: 'src/sections/latest-articles.html',
        controller: LatestArticlesController,
        controllerAs: 'latestArticles',
        bindings: {
            articles: '<',
        },
    });
}());
