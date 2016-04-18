(function () {
    keylolApp.controller("ActionHubController", [
        "$scope", "union", "window", "$timeout", "$http", "notification",
        ($scope, union, window, $timeout, $http, notification) => {
            $scope.union = union;
            $scope.hideAnimate = true;
            if (union.$localStorage.user) {
                $scope.$watch("union.$localStorage.user.MessageCount", newValue => {
                    $scope.newMessages = typeof newValue === "string" ? newValue.split(",").map(element => {
                        return parseInt(element);
                    }) : [0, 0, 0];
                });
                $scope.couponChanges = [];
                union.getUnreadLogs = function () {
                    $http.get(`${apiEndpoint}coupon-log/unread`).then(response => {
                        $scope.hideAnimate = false;
                        const unreadLogs = response.data;
                        let couponChangeTimeout;
                        function setCouponChange(change) {
                            if (!couponChangeTimeout) {
                                couponChangeTimeout = $timeout(() => {
                                    $scope.couponChanges.push(change);
                                    union.$localStorage.user.fakeCoupon = undefined;
                                    return $timeout(() => {
                                    }, 1700);
                                }, 1000);
                            } else {
                                couponChangeTimeout = couponChangeTimeout.then(() => {
                                    $scope.couponChanges.push(change);
                                    return $timeout(() => {
                                    }, 1700);
                                });
                            }
                        }
                        for (let i = 0; i < unreadLogs.length; i++) {
                            setCouponChange(unreadLogs[i]);
                        }
                        if (couponChangeTimeout) {
                            couponChangeTimeout.then(() => {
                                $scope.hideAnimate = true;
                                const newCoupon = unreadLogs[unreadLogs.length - 1];
                                union.$localStorage.user.Coupon = newCoupon.Before + newCoupon.Change;
                            });
                        } else {
                            $scope.hideAnimate = true;
                            union.$localStorage.user.fakeCoupon = undefined;
                        }
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                        $scope.hideAnimate = true;
                        union.$localStorage.user.fakeCoupon = undefined;
                    });
                };
                union.getUnreadLogs();
            }

            $scope.showRegistrationWindow = () => {
                window.show({
                    templateUrl: "components/windows/registration.html",
                    controller: "RegistrationController",
                    inputs: { options: {} },
                });
            };

            $scope.showLoginSteamWindow = () => {
                window.show({
                    templateUrl: "components/windows/login-steam.html",
                    controller: "LoginSteamController",
                });
            };

            $scope.showSettingsWindow = () => {
                window.show({
                    templateUrl: "components/windows/settings.html",
                    controller: "SettingsController",
                    inputs: { options: {} },
                });
            };
        },
    ]);
}());
