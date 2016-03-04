(function () {
    "use strict";

    keylolApp.controller("OperationFeedbackController", [
        "$scope", "close", "options", "$timeout",
        function ($scope, close, options, $timeout) {
            $scope.options = options;
            if ($scope.options.type != "attention") {
                $timeout(function () {
                    close();
                }, 3000);
            }
            $scope.close = function (result) {
                close(result);
            };
        }
    ]);
})();