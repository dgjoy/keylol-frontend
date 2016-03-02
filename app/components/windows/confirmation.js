(function () {
    "use strict";

    keylolApp.controller("ConfirmationController", [
        "$scope", "close", "window", "apiEndpoint", "utils", "notification", "point", "$location", "union",
        function ($scope, close, window, apiEndpoint, utils, notification, point, $location, union) {
            $scope.utils = utils;
            $scope.cancel = function () {
                close();
            };
            $scope.submit = function () {
                close();
                if(!union.inEditor){
                    $location.url('point/' + point.IdCode);
                    notification.success("「据点已开设」");
                }else {
                    notification.success("「据点已开设，可以随时接收文章投稿」");
                }
            };
            $scope.switchToEditInfo = function () {
                window.show({
                    templateUrl: "components/windows/point-settings.html",
                    controller: "PointSettingsController",
                    inputs: {
                        point: point,
                        isGame: true,
                        isJustCreated: true
                    }
                });
                close();
            };
            $scope.point = point;
        }
    ]);
})();