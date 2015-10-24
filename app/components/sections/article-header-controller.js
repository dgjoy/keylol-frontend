(function () {
    "use strict";

    keylolApp.controller("ArticleHeaderController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.article = union.article;
        }
    ]);
})();