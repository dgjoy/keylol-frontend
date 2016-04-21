(function () {
    class ActionHubController {
        constructor ($scope, union, window, $timeout, $http, notification, apiEndpoint) {
            $.extend(this, {
                union,
                window,
                $timeout,
                hideAnimate: true,
            });
            if (union.$localStorage.user) {
                $scope.$watch("union.$localStorage.user.MessageCount", newValue => {
                    this.newMessages = typeof newValue === "string" ? newValue.split(",").map(element => {
                        return parseInt(element);
                    }) : [0, 0, 0];
                });
                this.couponChanges = [];
                union.getUnreadLogs = () => {
                    $http.get(`${apiEndpoint}coupon-log/unread`).then(response => {
                        this.hideAnimate = false;
                        const unreadLogs = response.data;
                        let couponChangeTimeout = null;
                        for (let i = 0; i < unreadLogs.length; i++) {
                            couponChangeTimeout = this.setCouponChange(unreadLogs[i], couponChangeTimeout);
                        }
                        if (couponChangeTimeout) {
                            couponChangeTimeout.then(() => {
                                this.hideAnimate = true;
                                const newCoupon = unreadLogs[unreadLogs.length - 1];
                                union.$localStorage.user.Coupon = newCoupon.Before + newCoupon.Change;
                            });
                        } else {
                            this.hideAnimate = true;
                            union.$localStorage.user.fakeCoupon = undefined;
                        }
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                        this.hideAnimate = true;
                        union.$localStorage.user.fakeCoupon = undefined;
                    });
                };
                union.getUnreadLogs();
            }
        }
        setCouponChange (change, couponChangeTimeout) {
            if (!couponChangeTimeout) {
                return this.$timeout(() => {
                    this.couponChanges.push(change);
                    this.union.$localStorage.user.fakeCoupon = undefined;
                    return this.$timeout(() => {
                    }, 1700);
                }, 1000);
            } else {
                return couponChangeTimeout.then(() => {
                    this.couponChanges.push(change);
                    return this.$timeout(() => {
                    }, 1700);
                });
            }
        }
        showRegistrationWindow () {
            this.window.show({
                templateUrl: "src/windows/registration.html",
                controller: "RegistrationController",
                inputs: { options: {} },
            });
        };
        showLoginSteamWindow () {
            this.window.show({
                templateUrl: "src/windows/login-steam.html",
                controller: "LoginSteamController",
            });
        };
        showSettingsWindow () {
            this.window.show({
                templateUrl: "src/windows/settings.html",
                controller: "SettingsController",
                inputs: { options: {} },
            });
        };
    }

    keylolApp.component("actionHub", {
        templateUrl: "src/sections/action-hub.html",
        controller: ActionHubController,
        controllerAs: "actionHub",
    });
}());
