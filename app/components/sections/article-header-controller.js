(function () {
    "use strict";

    keylolApp.controller("ArticleHeaderController", [
        "$scope", "union", "window",
        function ($scope, union, window) {
            $scope.article = union.article;
            $scope.editArticle = function () {
                window.show({
                    templateUrl: "components/windows/editor.html",
                    controller: "EditorController",
                    inputs: {
                        options: {
                            type: "edit",
                            article: $scope.article
                        }
                    }
                });
            }
        }
    ]);
})();