(function () {
    "use strict";

    keylolApp.controller("ItemPreviewController", [
        "$scope", "close", "window", "$http", "apiEndpoint", "notification", "union",
        function ($scope, close, window, $http, apiEndpoint, notification, union) {
            $scope.union = union;

            $scope.cancel = function () {
                close();
            };

            $scope.preview = function () {
                window.show({
                    templateUrl: "components/windows/image-preview.html",
                    controller: "ImagePreviewController",
                    inputs: {
                        imageSrc: "assets/images/Preview_SteamCN Medal.jpg"
                    }
                });
            };

            $scope.redeem = function () {
                close();
                window.show({
                    templateUrl: "components/windows/shop-collect.html",
                    controller: "ShopCollectController",
                    inputs: {}
                });
            }
        }
    ]);
})();