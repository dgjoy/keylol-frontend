(function () {
    "use strict";

    keylolApp.directive("inputCode", [
        function () {
            return {
                restrict: "E",
                templateUrl: "components/directives/input-code.html",
                scope: {
                    length: "="
                },
                require: "ngModel",
                link: function (scope, element, attrs, ngModel) {
                    scope.repeats = new Array(scope.length); // For ng-repeat
                    scope.text = {};
                    scope.focus = {};
                    scope.keydown = function (index, event) {
                        if (event.keyCode === 8) { // backspace
                            scope.text = {};
                            scope.focus[0] = true;
                        } else if (event.keyCode === 37) { // left
                            scope.focus[index - 1] = true;
                        } else if (event.keyCode === 39) { // right
                            scope.focus[index + 1] = true;
                        }
                    };
                    scope.focusFirstIfEmpty = function () {
                        for (var l = 0; l < scope.length; ++l) {
                            if (scope.text[l])
                                return;
                        }
                        scope.focus[0] = true;
                    };

                    ngModel.$render = function () {
                        if(ngModel.$viewValue){
                            for (var k = 0; k < scope.length; k++) {
                                scope.text[k] = ngModel.$viewValue[k];
                            }
                        }
                    };

                    for (var j = 0; j < scope.length; ++j) {
                        (function (j) {
                            scope.$watch("text[" + j + "]", function (newValue, oldValue) {
                                // Get full text
                                var fullText = "";
                                for (var i = 0; i < scope.length; i++) {
                                    if (scope.text[i]) {
                                        fullText += scope.text[i][0];
                                    }
                                }
                                ngModel.$setViewValue(fullText);
                                if (newValue && (!oldValue || newValue.length >= oldValue.length))
                                    scope.focus[j + 1] = true;
                            });
                        })(j);
                    }
                }
            };
        }
    ]);
})();