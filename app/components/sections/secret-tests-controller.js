(function () {
    "use strict";

    keylolApp.controller("SecretTestsController", [
        "$scope", "window",
        function ($scope, window) {
            $scope.showCreatePointWindow = function () {
                window.show({
                    templateUrl: "components/windows/create-point.html",
                    controller: "CreatePointController",
                    inputs: {vm: null}
                });
            };
            $scope.showPointListWindow = function () {
                window.show({
                    templateUrl: "components/windows/point-list.html",
                    controller: "PointListController"
                });
            };
            $scope.showShortReviewWindow = function () {
                window.show({
                    templateUrl: "components/windows/short-review.html",
                    controller: "ShortReviewController",
                    inputs: {options: null}
                });
            };
            $scope.showPointAppealWindow = function () {
                window.show({
                    templateUrl: "components/windows/shop-link.html",
                    controller: "ShopLinkController"
                });
            };
        }
    ]);
})();