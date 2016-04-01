(function () {
    "use strict";

    keylolApp.controller("ActionHubController", [
        "$scope", "union", "window", "$timeout",
        function ($scope, union, window, $timeout) {
            $scope.union = union;
            if(union.$localStorage.user){
                $scope.$watch('union.$localStorage.user.MessageCount', function (newValue) {
                    $scope.newMessages = typeof newValue === "string"?newValue.split(',').map(function (element) {
                        return parseInt(element);
                    }):[0,0,0];
                });
            }

            $scope.couponChanges = [];

            $scope.fakeCoupon = 26;
            $timeout(function () {
                $scope.couponChanges.push({
                    beforeChange: 26,
                    Event: "发布文章",
                    changeCount: -3
                });
                $scope.fakeCoupon = null;
                $timeout(function () {
                    $scope.hideAnimate = true;
                }, 2000)
            },1000);

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