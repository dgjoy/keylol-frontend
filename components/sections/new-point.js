(function () {
    "use strict";

    keylolApp.controller("NewPointController", [
        "$scope", "window",
        function ($scope, window) {
            $scope.showPointAppealWindow = function () {
                window.show({
                    templateUrl: "components/windows/shop-link.html",
                    controller: "ShopLinkController"
                });
            };
        }
    ]);
})();