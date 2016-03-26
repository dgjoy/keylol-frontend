(function () {
    "use strict";

    keylolApp.directive("moderationResult", [
        "union", "moderationResult",
        function (union, moderationResult) {
            return {
                restrict: "E",
                templateUrl: "components/directives/moderation-result.html",
                scope: {
                    type: "="
                },
                link: function (scope) {
                    console.log(scope.type);
                    scope.text = moderationResult[scope.type];
                }
            };
        }
    ]);
})();