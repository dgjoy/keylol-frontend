(function () {
    "use strict";

    keylolApp.controller("ItemPreviewController", [
        "$scope", "close", "window", "$http", "apiEndpoint", "notification", "union", "item",
        function ($scope, close, window, $http, apiEndpoint, notification, union, item) {
            $scope.union = union;
            $scope.item = item;
            $scope.cancel = function () {
                close();
            };

            $scope.preview = function () {
                window.show({
                    templateUrl: "components/windows/image-preview.html",
                    controller: "ImagePreviewController",
                    inputs: {
                        imageSrc: item.PreviewImage
                    }
                });
            };

            $scope.redeem = function () {
                close();
                window.show({
                    templateUrl: "components/windows/shop-collect.html",
                    controller: "ShopCollectController",
                    inputs: {
                        item: item
                    }
                });
            }
        }
    ]);
})();