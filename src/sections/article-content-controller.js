(function () {
    class ArticleContentController {
        constructor (union, $http, notification, apiEndpoint) {
            $.extend(this, {
                apiEndpoint,
                union,
                $http,
                notification,
            });
        }
    }

    keylolApp.component('articleContent', {
        templateUrl: 'src/sections/article-content.html',
        controller: ArticleContentController,
        controllerAs: 'articleContent',
        bindings: {
            article: '<',
            theme: '<',
        },
    });
}());
