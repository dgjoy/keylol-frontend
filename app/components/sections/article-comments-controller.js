(function () {
    "use strict";

    keylolApp.controller("ArticleCommentsController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.comments = union.comments;
            $scope.user = union.$localStorage.user;
            console.log($scope.user);
        }
    ]);
})();