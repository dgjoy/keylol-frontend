(function () {
    class ArticleReviewController {
        constructor (union, utils) {
            $.extend(this, {
                utils,
                article: union.article,
                point: union.point,
                summary: union.summary,
            });
        }
    }

    keylolApp.component('articleReview', {
        templateUrl: 'src/sections/article-review.html',
        controller: ArticleReviewController,
        controllerAs: 'articleReview',
    });
}());
