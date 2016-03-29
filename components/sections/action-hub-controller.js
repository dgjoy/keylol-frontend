(function () {
    "use strict";

    keylolApp.controller("ActionHubController", [
        "$scope", "union", "window",
        function ($scope, union, window) {
            $scope.union = union;
            if(union.$localStorage.user){
                $scope.newMessages = union.$localStorage.user.MessageCount?union.$localStorage.user.MessageCount.split(',').map(function (element) {
                    return parseInt(element);
                }):[0,0,0];
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