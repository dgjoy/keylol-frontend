(function () {
    "use strict";

    keylolApp.controller("EntryFilterController", [
        "$scope", "selectedIndexes", "close", "types", "currPage", "shortReviewFilter",
        function ($scope, selectedIndexes, close, types, currPage, shortReviewFilter) {
            var vm = this;
            $scope.currPage = currPage;
            vm.subscribeUser = shortReviewFilter & 1;
            vm.subscribePoint = shortReviewFilter & 2;
            vm.synchronization = shortReviewFilter & 4;
            if (selectedIndexes)
                $scope.selectedIndexes = selectedIndexes.slice();
            $scope.entryTypes = types;
            $scope.confirm = function () {
                close({
                    shortReviewFilter: vm.subscribeUser + vm.subscribePoint + vm.synchronization,
                    filterOptions: $scope.selectedIndexes
                });
            };
        }
    ]);
})();