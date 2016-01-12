(function () {
    "use strict";

    keylolApp.directive("pointReview", [
        function () {
            return {
                restrict: "E",
                templateUrl: "components/directives/point-review.html",
                scope: {
                    noString: "="
                },
                require: "ngModel",
                link: function (scope, element, attrs, ngModel) {
                    scope.levelString = ["terrible", "bad", "not-bad", "good", "awesome"];
                    scope.reviewCircles = [{},{},{},{},{}];
                    scope.reviewLevel = -1;
                    scope.reviewString = "";
                    scope.changeReview = function(i){
                        for(var k in scope.reviewCircles){
                            scope.reviewCircles[k].type = "";
                        }
                        for(var j = 0;j <= i;j++){
                            scope.reviewCircles[j].type = scope.levelString[i];
                        }
                    };
                    scope.returnDefault = function(){
                        scope.changeReview(scope.reviewLevel);
                    };
                    scope.setReview = function(i){
                        scope.reviewLevel = i;
                        scope.reviewString = scope.levelString[i];
                    };
                }
            };
        }
    ]);
})();