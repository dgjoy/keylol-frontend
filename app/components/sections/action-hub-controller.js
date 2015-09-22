(function() {
    "use strict";

    keylolApp.controller("ActionHubController", [
        "$scope", "union", "window",
		function($scope, union, window) {
		    $scope.union = union;

		    $scope.showRegistrationWindow = function () {
				window.show({
		            templateUrl: "components/windows/registration.html",
		            controller: "RegistrationController"
		        });
		    };

		    $scope.showLoginPasswordWindow = function () {
				window.show({
		            templateUrl: "components/windows/login-password.html",
		            controller: "LoginPasswordController"
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