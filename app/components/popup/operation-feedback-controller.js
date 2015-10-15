(function () {
    "use strict";

    keylolApp.controller("OperationFeedbackController", [
        "$scope", "close", "data",
        function ($scope, close, data) {
            $scope.data = data;
        }
    ]);
})();