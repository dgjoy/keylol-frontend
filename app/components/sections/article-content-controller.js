(function () {
    "use strict";

    keylolApp.controller("ArticleContentController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.article = union.article;
        }
    ]);
})();