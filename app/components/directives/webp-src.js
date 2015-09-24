(function() {
	"use strict";

	keylolApp.directive("webpSrc", [
		"utils",
		function(utils) {
			return {
				restrict: "A",
				priority: 98,
				link: function(scope, element, attrs) {
					attrs.$observe("webpSrc", function(value) {
						utils.supportWebp.then(function() {
							attrs.$set("src", value + ".webp");
						}, function() {
							attrs.$set("src", value);
						});
					});
				}
			};
		}
	]);
})();