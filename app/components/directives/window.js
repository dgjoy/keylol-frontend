(function() {
	"use strict";

	keylolApp.directive("window", [
		"$timeout",
		function($timeout) {
			var exitFocus;
			return {
				restrict: "E",
				transclude: true,
				templateUrl: "components/directives/window.html",
				scope: {
					position: "@position"
				},
				compile: function() {
					return {
						post: function postLink(scope, iElement) {
							exitFocus = angular.element(iElement[0].querySelector(".window-exit-button"));
							iElement.on("click", function(e) {
								if (e.target === iElement[0]) {
									if (!exitFocus.hasClass("focused")) {
										exitFocus.addClass("focused");
										$timeout(function() {
											exitFocus.removeClass("focused");
										}, 900);
									}
								}
							});
						}
					};
				}
			};
		}
	]);
})();