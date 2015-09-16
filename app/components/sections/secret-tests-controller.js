(function() {
	"use strict";

	keylolApp.controller("SecretTestsController", [
		"$scope", "modal",
		function($scope, modal) {
			$scope.showRegistrationForm = function() {
				modal.show({
					templateUrl: "components/windows/registration.html",
					controller: "RegistrationController"
				});
			};

			$scope.showLoginPasswordForm = function() {
				modal.show({
					templateUrl: "components/windows/login-password.html",
					controller: "LoginPasswordController"
				});
			};
			$scope.showEditor = function() {
				modal.show({
					templateUrl: "components/windows/editor.html",
					controller: "EditorController"
				});
			};
			$scope.showSettings = function() {
				modal.show({
					templateUrl: "components/windows/settings.html",
					controller: "SettingsController"
				});
			};
		}
	]);
})();