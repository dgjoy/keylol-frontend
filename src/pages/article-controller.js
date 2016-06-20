(function () {
    class ArticleController {
        constructor (pageLoad, $scope, stateTree) {
            pageLoad('content.article');

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('ArticleController', ArticleController);
}());
