(function () {
    "use strict";

    keylolApp.controller("EntryFilterController", [
        "$scope", "selectedIndexes", "close", "types",
        function ($scope, selectedIndexes, close, types) {
            if (selectedIndexes)
                $scope.selectedIndexes = selectedIndexes.slice();
            $scope.entryTypes = types;
            $scope.confirm = function () {
                close($scope.selectedIndexes);
            };
        }
    ]);
})();