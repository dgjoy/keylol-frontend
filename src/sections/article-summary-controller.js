(function () {
    class ArticleSummaryController {
        constructor () {}
    }

    keylolApp.component('articleSummary', {
        templateUrl: 'src/sections/article-summary.html',
        controller: ArticleSummaryController,
        controllerAs: 'articleSummary',
        bindings: {
            theme: '<',
            article: '<',
        },
    });
}());
