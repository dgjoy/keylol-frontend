(function () {
    "use strict";

    keylolApp.directive("missiveQuote", [
        "union", "moderationResult",
        function (union, moderationResult) {
            return {
                restrict: "E",
                templateUrl: "components/directives/missive-quote.html",
                scope: {
                    reasonText: "="
                },
                link: function (scope) {
                }
            };
        }
    ]);
})();