(function () {
    keylolApp.directive("pointReview", () => {
        return {
            restrict: "E",
            templateUrl: "src/directives/point-review.html",
            scope: {
                noString: "=",
                onClickReview: "&",
                bindReview: "=",
                isHollow: "=",
            },
            link (scope) {
                scope.levelString = ["terrible", "bad", "not-bad", "good", "awesome"];
                scope.reviewCircles = [{}, {}, {}, {}, {}];
                scope.reviewLevel = -1;
                scope.reviewString = "";
                scope.changeReview = i => {
                    for (let j = 0; j <= scope.reviewCircles.length; j++) {
                        scope.reviewCircles[j].type = j <= i ? scope.levelString[i] : "";
                    }
                };
                scope.returnDefault = () => {
                    scope.changeReview(scope.reviewLevel);
                };
                scope.setReview = i => {
                    if (!scope.onClickReview({ vote: i + 1 })) {
                        scope.reviewLevel = i;
                        scope.reviewString = scope.levelString[i];
                        scope.bindReview = i + 1;
                    }
                };
                if (scope.bindReview) {
                    scope.setReview(scope.bindReview - 1);
                    scope.returnDefault();
                }
            },
        };
    });
}());
