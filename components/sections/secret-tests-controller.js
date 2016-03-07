(function () {
    "use strict";

    keylolApp.controller("SecretTestsController", [
        "$scope", "window", "$http", "notification",
        function ($scope, window, $http, notification) {
            $scope.showSyncWindow = function () {
                $http.put(apiEndpoint + "user-game-record/my", {}).then(function (response) {
                    window.show({
                        templateUrl: "components/windows/synchronization.html",
                        controller: "SynchronizationController",
                        inputs: {
                            condition: "firstTime",
                            autoSubscribed: response.data,
                            options: {}
                        }
                    });
                }, function (response) {
                    if(response.status === 404) return;
                    if(response.status === 401) {
                        window.show({
                            templateUrl: "components/windows/synchronization.html",
                            controller: "SynchronizationController",
                            inputs: {
                                condition: "fetchFailed",
                                autoSubscribed: {},
                                options: {}
                            }
                        });
                        return;
                    }
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            };
            $scope.showPointListWindow = function () {
                window.show({
                    templateUrl: "components/windows/point-list.html",
                    controller: "PointListController"
                });
            };
        }
    ]);
})();