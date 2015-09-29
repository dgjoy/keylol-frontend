(function() {
	"use strict";

	keylolApp.controller("TimelineController", [
		"$scope", "union",
		function($scope, union) {
			$scope.headingDisplayMode = function(entry) {
				if (entry.source)
					return "source";
				else
					return "title";
			};
			$.extend($scope, union.timeline);
		}
	]);
})();