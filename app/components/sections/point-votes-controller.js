(function () {
    "use strict";

    keylolApp.controller("PointVotesController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.point = union.point;
        }
    ]);
})();