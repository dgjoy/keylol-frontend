(function () {
    "use strict";

    keylolApp.controller("ActionHubController", [
        "$scope", "union", "window", "$timeout", "$http",
        function ($scope, union, window, $timeout, $http) {
            $scope.union = union;
            $scope.hideAnimate = true;
            if (union.$localStorage.user) {
                $scope.$watch('union.$localStorage.user.MessageCount', function (newValue) {
                    $scope.newMessages = typeof newValue === "string" ? newValue.split(',').map(function (element) {
                        return parseInt(element);
                    }) : [0, 0, 0];
                });
                $scope.couponChanges = [];
                union.getUnreadLogs = function () {
                    $http.get(apiEndpoint + "coupon-log/unread").then(function (response) {
                        $scope.hideAnimate = false;
                        var unreadLogs = response.data;
                        var couponChangeTimeout;
                        for (var i = 0; i < unreadLogs.length; i++) {
                            (function (change) {
                                if (!couponChangeTimeout) {
                                    couponChangeTimeout = $timeout(function () {
                                        $scope.couponChanges.push(change);
                                        union.$localStorage.user.fakeCoupon = undefined;
                                        return $timeout(function () {
                                        }, 1700)
                                    }, 1000);
                                } else {
                                    couponChangeTimeout = couponChangeTimeout.then(function () {
                                        $scope.couponChanges.push(change);
                                        return $timeout(function () {
                                        }, 1700);
                                    });
                                }
                            })(unreadLogs[i]);
                        }
                        if (couponChangeTimeout) {
                            couponChangeTimeout.then(function () {
                                $scope.hideAnimate = true;
                                var newCoupon = unreadLogs[unreadLogs.length - 1];
                                union.$localStorage.user.Coupon = newCoupon.Before + newCoupon.Change;
                            });
                        } else {
                            $scope.hideAnimate = true;
                            union.$localStorage.user.fakeCoupon = undefined;
                        }
                    }, function (response) {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                        $scope.hideAnimate = true;
                        union.$localStorage.user.fakeCoupon = undefined;
                    });
                };
                union.getUnreadLogs();
            }

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

            $scope.showSettingsWindow = function () {
                window.show({
                    templateUrl: "components/windows/settings.html",
                    controller: "SettingsController",
                    inputs: {
                        options: {}
                    }
                });
            };
        }
    ]);
})();