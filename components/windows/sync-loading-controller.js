(function () {
    "use strict";

    keylolApp.controller("SyncLoadingController", [
        "$scope", "close", "$timeout", "window", "$http", "options", "notification",
        function ($scope, close, $timeout, window, $http, options, notification) {
            var staticGroup = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "O", "P", "Q"];
            $scope.animateGroup = staticGroup.slice();
            $scope.animateIndex = -1;
            $scope.changeFlag = true;
            var timeoutFunction = function () {
                $scope.changeFlag = !$scope.changeFlag;
                $scope.animateGroup.splice($scope.animateIndex, 1);
                if ($scope.animateGroup.length === 0) {
                    $scope.animateGroup = staticGroup.slice();
                }
                $scope.animateIndex = Math.floor(Math.random() * $scope.animateGroup.length);
                $timeout(timeoutFunction, 2000);
            };
            $timeout(timeoutFunction, 100);
            var jumpLock = true;
            var inputs = {};
            var a = $http.put(apiEndpoint + "user-game-record/my", {}, {
                params: {
                    manual: !options.isFirstTime
                }
            });
            $timeout(function () {
                a.then(function (response) {
                    window.show({
                        templateUrl: "components/windows/synchronization.html",
                        controller: "SynchronizationController",
                        inputs: {
                            condition: options.isFirstTime ? "firstTime" : "subsequential",
                            autoSubscribed: response.data,
                            options: {
                                getSubscription: options.getSubscription
                            }
                        }
                    });
                    close();
                }, function (response) {
                    if (response.status === 401) {
                        window.show({
                            templateUrl: "components/windows/synchronization.html",
                            controller: "SynchronizationController",
                            inputs: {
                                condition: "fetchFailed",
                                autoSubscribed: {},
                                options: {
                                    getSubscription: options.getSubscription
                                }
                            }
                        });
                    }else if (response.status === 404) {
                        notification.error("距离上次同步间隔不足 1 分钟，如有需要请在冷却时间过后再次同步", response);
                    } else {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    }
                    close();
                });
            }, 3000);
        }
    ]);
})();