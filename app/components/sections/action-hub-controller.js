(function() {
    "use strict";

    keylolApp.controller("ActionHubController", [
        "$scope", "union", "modal",
		function($scope, union, modal) {
		    $scope.union = union;

		    $scope.showRegistrationWindow = function () {
		        modal.show({
		            templateUrl: "components/windows/registration.html",
		            controller: "RegistrationController"
		        });
		    };

		    $scope.showLoginPasswordWindow = function () {
		        modal.show({
		            templateUrl: "components/windows/login-password.html",
		            controller: "LoginPasswordController"
		        });
		    };

		    $scope.showSettingsWindow = function () {
		        modal.show({
		            templateUrl: "components/windows/settings.html",
		            controller: "SettingsController"
		        });
		    };
		}
    ]);
})();