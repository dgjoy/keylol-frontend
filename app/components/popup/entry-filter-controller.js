(function () {
    "use strict";

    keylolApp.controller("EntryFilterController", [
        "$scope", "filterOptions", "close", "filterArray",
        function ($scope, filterOptions, close, filterArray) {
            $scope.filterOptions = filterOptions;
            $scope.filterArray = filterArray;
            $scope.onFilter = function () {
                close($scope.filterOptions);
            };

            $scope.changeFilterOption = function (index) {
                $scope.filterOptions[index] = !$scope.filterOptions[index];
            };
        }
    ]);
})();