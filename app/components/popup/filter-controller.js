(function () {
    "use strict";

    keylolApp.controller("FilterController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.data = union.filter;

            $scope.changeFilterOption = function(index){
                $scope.data.filterOptions[index] = !$scope.data.filterOptions[index];
            };
        }
    ]);
})();