(function () {
    "use strict";

    keylolApp.controller("ArticleSelectorController", [
        "$scope", "close", "selectedType", "articleTypeArray",
        function ($scope, close, selectedType, articleTypeArray) {
            $scope.articleTypeArray = articleTypeArray;
            $scope.typeOptions = [];
            for (var i = 0; i < articleTypeArray.length; i++) {
                $scope.typeOptions.push(false);
            }
            $scope.typeOptions[selectedType] = true;
            $scope.changeSelector = function (index) {
                $scope.typeOptions[index] = true;
                $scope.typeOptions[selectedType] = false;
                close(index);
            };
        }
    ]);
})();