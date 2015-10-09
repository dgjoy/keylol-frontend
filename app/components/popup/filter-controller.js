(function () {
    "use strict";

    keylolApp.controller("FilterController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.data = union.filter;
        }
    ]);
})();