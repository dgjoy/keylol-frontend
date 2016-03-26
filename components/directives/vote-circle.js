(function () {
    "use strict";

    keylolApp.directive("voteCircle", [
        "utils",
        function (utils) {
            return {
                restrict: "E",
                templateUrl: "components/directives/vote-circle.html",
                scope: {
                    vote: "=",
                    disabled: "="
                },
                link: function (scope) {
                    scope.circles = new Array(scope.vote);
                    scope.voteColor = utils.getVoteColor(scope.vote - 1);
                }
            };
        }
    ]);
})();