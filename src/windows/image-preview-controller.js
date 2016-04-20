(function () {
    keylolApp.controller("ImagePreviewController", [
        "$scope", "close", "imageSrc",
        ($scope, close, imageSrc) => {
            $scope.cancel = () => {
                close();
            };

            $scope.imageSrc = imageSrc;
        },
    ]);
}());
