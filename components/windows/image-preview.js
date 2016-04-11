(function () {
    "use strict";

    keylolApp.controller("ImagePreviewController", [
        "$scope", "close", "imageSrc",
        function ($scope, close, imageSrc) {
            $scope.cancel = function () {
                close();
            };

            $scope.imageSrc = imageSrc;
        }
    ]);
})();