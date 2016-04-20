(function () {
    keylolApp.directive("moderationResult", ["moderationResult", moderationResult => {
        return {
            restrict: "E",
            templateUrl: "src/directives/moderation-result.html",
            scope: { type: "=" },
            link (scope) {
                scope.text = moderationResult[scope.type];
            },
        };
    }]);
}());
