(function() {
	"use strict";

	keylolApp.directive("webpBackground", [
		"utils",
		function(utils) {
			return {
				restrict: "A",
				priority: 98,
				link: function(scope, element, attrs) {
					attrs.$observe("webpBackground", function(value) {
						utils.supportWebp.then(function() {
							element.css("background-image", "url(" + value + ".webp" + ")");
						}, function() {
							element.css("background-image", "url(" + value + ")");
						});
					});
				}
			};
		}
	]);
})();