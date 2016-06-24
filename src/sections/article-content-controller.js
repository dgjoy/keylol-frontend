(function () {
    class ArticleContentController {
        constructor (union, $http, notification, apiEndpoint, utils, stateTree) {
            $.extend(this, {
                apiEndpoint,
                union,
                $http,
                notification,
                utils,
                stateTree,
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
