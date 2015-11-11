(function () {
    "use strict";

    keylolApp.controller("ActionHubController", [
        "$scope", "union", "window",
        function ($scope, union, window) {
            $scope.union = union;

            $scope.showRegistrationWindow = function () {
                window.show({
                    templateUrl: "components/windows/registration.html",
                    controller: "RegistrationController"
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
                    controller: "SettingsController"
                });
            };
        }
    ]);
})();