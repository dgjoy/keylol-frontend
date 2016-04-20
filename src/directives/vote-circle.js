(function () {
    keylolApp.directive("voteCircle", ["utils", utils => {
        return {
            restrict: "E",
            templateUrl: "src/directives/vote-circle.html",
            scope: {
                vote: "=",
                disabled: "=",
                wholeWhite: "=",
            },
            link (scope) {
                scope.circles = new Array(scope.vote);
                scope.voteColor = utils.getVoteColor(scope.vote - 1);
            },
        };
    }]);
}());
