(function () {
    "use strict";

    keylolApp.controller("SpotlightBannerController", [
        "$scope", "notification",
        function ($scope, notification) {
            $scope.notification = notification;
        }
    ]);
})();