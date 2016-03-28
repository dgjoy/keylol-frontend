(function () {
    "use strict";

    keylolApp.directive("moderationResult", [
        "moderationResult",
        function (moderationResult) {
            return {
                restrict: "E",
                templateUrl: "components/directives/moderation-result.html",
                scope: {
                    type: "="
                },
                link: function (scope) {
                    scope.text = moderationResult[scope.type];
                }
            };
        }
    ]);
})();