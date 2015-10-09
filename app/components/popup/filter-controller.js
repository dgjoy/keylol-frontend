(function() {
	"use strict";

	keylolApp.controller("FilterController", [
		"$scope", "close", "$element", "utils",
		function($scope, close, $element, utils) {
			$scope.filterOptions = [true, true, true, true, true];
		}
	]);
})();