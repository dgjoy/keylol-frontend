(function () {
    "use strict";

    keylolApp.controller("PointPreviewCardController", [
        "$scope", "data",
        function ($scope, data) {
            $scope.data = data;
        }
    ]);
})();