(function () {
    keylolApp.controller("ArticleTypeSelectorController", [
        "$scope", "close", "selectedIndex", "articleTypes",
        ($scope, close, selectedIndex, articleTypes) => {
            $scope.articleTypes = articleTypes;
            $scope.selectedIndex = selectedIndex;
            $scope.select = function (index) {
                close(index);
            };
        },
    ]);
}());
