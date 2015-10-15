(function () {
    "use strict";

    keylolApp.controller("ArticleSelectorController", [
        "$scope", "close", "selectedType",
        function ($scope, close, selectedType) {
            $scope.typeOptions = [];
            for(var i = 0;i < 5;i++){
                $scope.typeOptions[i] = false;
            }
            $scope.typeOptions[selectedType] = true;
            $scope.changeSelector = function(index){
                $scope.typeOptions[index] = true;
                $scope.typeOptions[selectedType] = false;
                close(index);
            };
        }
    ]);
})();