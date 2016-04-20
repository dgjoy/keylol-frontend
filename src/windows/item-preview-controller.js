(function () {
    keylolApp.controller("ItemPreviewController", [
        "$scope", "close", "window", "$http", "apiEndpoint", "notification", "union", "item",
        ($scope, close, window, $http, apiEndpoint, notification, union, item) => {
            $scope.union = union;
            $scope.item = item;
            $scope.cancel = () => {
                close();
            };

            $scope.preview = () => {
                window.show({
                    templateUrl: "src/windows/image-preview.html",
                    controller: "ImagePreviewController",
                    inputs: { imageSrc: item.PreviewImage },
                });
            };

            $scope.redeem = () => {
                close();
                window.show({
                    templateUrl: "src/windows/shop-collect.html",
                    controller: "ShopCollectController",
                    inputs: { item },
                });
            };
        },
    ]);
}());
