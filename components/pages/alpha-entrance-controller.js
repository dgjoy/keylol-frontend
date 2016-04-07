(function () {
    "use strict";

    keylolApp.controller("AlphaEntranceController", [
        "pageTitle", "$scope", "$timeout", "$rootScope", "window", "$window", "union", "$location",
        function (pageTitle, $scope, $timeout, $rootScope, window, $window, union, $location) {
            pageTitle.set("其乐 - 一个交流评测感悟的玩家社区");

            $scope.showRegistrationWindow = function () {
                window.show({
                    templateUrl: "components/windows/registration.html",
                    controller: "RegistrationController",
                    inputs: {
                        options: {}
                    }
                });
            };

            $scope.showLoginSteamWindow = function () {
                window.show({
                    templateUrl: "components/windows/login-steam.html",
                    controller: "LoginSteamController"
                });
            };

            $scope.showInvitationWindow = function () {
                window.show({
                    templateUrl: "components/windows/alpha-invitation.html",
                    controller: "AlphaInvitationController"
                });
            };

            $scope.secondAnimate = false;
            var activeLock = 0;
            $scope.active = 0;
            var activeTimeout;
            $($window).scroll(function () {
                $scope.$apply(function () {
                    if ($scope.secondAnimate == false) {
                        if ($($window).scrollTop() >= 538) {
                            $scope.secondAnimate = true;
                        }
                    }
                    if ($($window).scrollTop() < 1152) {
                        $scope.active = 0;
                        activeLock = 0;
                    } else if ($($window).scrollTop() > 2077) {
                        $scope.active = 6;
                        activeLock = 6;
                    } else {
                        if ($($window).scrollTop() < 1337) {
                            changeActive(1);
                        } else if ($($window).scrollTop() < 1522) {
                            changeActive(2);
                        } else if ($($window).scrollTop() < 1707) {
                            changeActive(3);
                        } else if ($($window).scrollTop() < 1892) {
                            changeActive(4);
                        } else {
                            changeActive(5);
                        }
                    }
                });
            });

            var cancelListenRoute = $scope.$on("$destroy", function () {
                $($window).unbind("scroll");
                cancelListenRoute();
            });

            var changeActive = function (index) {
                if (activeLock != index) {
                    activeLock = index;
                    if (activeTimeout) {
                        $timeout.cancel(activeTimeout);
                    }
                    activeTimeout = $timeout(function () {
                        $scope.active = index;
                    }, 100);
                }
            }
        }
    ]);
})();