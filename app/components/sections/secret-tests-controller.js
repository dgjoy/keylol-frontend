(function() {
	"use strict";

	keylolApp.controller("SecretTestsController", [
		"$scope", "window",
		function($scope, window) {
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