(function () {
    "use strict";

    keylolApp.controller("PointVotesController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.data = union.point;
        }
    ]);
})();