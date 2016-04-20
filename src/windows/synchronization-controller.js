(function () {
    keylolApp.controller("SynchronizationController", [
        "$scope", "close", "condition", "autoSubscribed", "options", "utils", "$http", "notification", "window",
        "$location",
        ($scope, close, condition, autoSubscribed, options, utils, $http, notification, window,
        $location) => {
            $scope.cancel = function () {
                if ($location.url() === "/" && typeof options.getSubscription === "function" && condition !== "fetchFailed") {
                    options.getSubscription();
                }
                close();
            };
            $scope.deleteAuto = function (point) {
                point.deleteDisabled = true;
                $http.delete(`${apiEndpoint}user-point-subscription`, {
                    params: {
                        pointId: point.Id,
                        isAutoSubscription: true,
                    },
                }).then(() => {
                    notification.success("据点已退订");
                }, response => {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                    point.deleteDisabled = false;
                });
            };
            $scope.resync = function () {
                window.show({
                    templateUrl: "src/windows/sync-loading.html",
                    controller: "SyncLoadingController",
                    inputs: {
                        options: { getSubscription: options.getSubscription },
                    },
                });
                close();
            };
            $scope.jumpToSettings = function () {
                window.show({
                    templateUrl: "src/windows/settings.html",
                    controller: "SettingsController",
                    inputs: {
                        options: { page: "preferences" },
                    },
                });
                close();
            };
            $scope.condition = condition;
            $scope.autoSubscribed = autoSubscribed;
            $scope.subscribeEmpty = true;
            for (const i in $scope.autoSubscribed) {
                if ($scope.autoSubscribed.hasOwnProperty(i) && $scope.autoSubscribed[i].length > 0) {
                    $scope.subscribeEmpty = false;
                }
            }
            $scope.utils = utils;
        },
    ]);
}());
