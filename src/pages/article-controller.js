(function () {
    class ArticleController {
        constructor (pageLoad, $scope, stateTree) {
            pageLoad('content.article');
        }
    }

    keylolApp.controller('ArticleController', ArticleController);
}());
