/**
 * Created by Rex on 15/9/23.
 */
(function() {
    "use strict";

    keylolApp.controller("SummaryController", [
        "$scope", "union",
        function($scope, union) {
            $scope.data = union.summary;
        }
    ]);
})();