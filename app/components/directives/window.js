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
						post: function postLink(scope, element) {
							exitFocus = angular.element(element[0].querySelector(".window-exit-button"));
							element.on("click", function(e) {
								if (e.target === element[0]) {
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