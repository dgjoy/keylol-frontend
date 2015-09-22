(function() {
	"use strict";

	keylolApp.controller("SecretTestsController", [
		"$scope", "window",
		function($scope, window) {
			$scope.showRegistrationForm = function() {
				window.show({
					templateUrl: "components/windows/registration.html",
					controller: "RegistrationController"
				});
			};

			$scope.showLoginPasswordForm = function() {
				window.show({
					templateUrl: "components/windows/login-password.html",
					controller: "LoginPasswordController"
				});
			};
			$scope.showEditor = function() {
				window.show({
					templateUrl: "components/windows/editor.html",
					controller: "EditorController"
				});
			};
			$scope.showSettings = function() {
				window.show({
					templateUrl: "components/windows/settings.html",
					controller: "SettingsController"
				});
			};
		}
	]);
})();