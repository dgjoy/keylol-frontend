(function () {
    "use strict";

    keylolApp.controller("SecretTestsController", [
        "$scope", "window",
        function ($scope, window) {
            $scope.showCreatePoint = function () {
                window.show({
                    templateUrl: "components/windows/create-point.html",
                    controller: "CreatePointController"
                });
            };
        }
    ]);
})();