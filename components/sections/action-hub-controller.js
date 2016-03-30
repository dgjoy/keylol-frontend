(function () {
    "use strict";

    keylolApp.controller("ActionHubController", [
        "$scope", "union", "window",
        function ($scope, union, window) {
            $scope.union = union;
            if(union.$localStorage.user){
                $scope.$watch('union.$localStorage.user.MessageCount', function (newValue) {
                    $scope.newMessages = typeof newValue === "string"?newValue.split(',').map(function (element) {
                        return parseInt(element);
                    }):[0,0,0];
                });
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