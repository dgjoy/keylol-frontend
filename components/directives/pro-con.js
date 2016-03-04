(function () {
    "use strict";

    keylolApp.directive("proCon", [
        function () {
            return {
                restrict: "E",
                templateUrl: "components/directives/pro-con.html",
                scope: {
                    isNegative: "="
                },
                require: "ngModel",
                link: function (scope, element, attrs, ngModel) {
                    scope.proConString = scope.isNegative?"缺":"亮";
                    scope.valueArray = [];

                    ngModel.$render = function () {
                        if (ngModel.$viewValue && ngModel.$viewValue.length > 0) {
                            for (var i = 0; i < ngModel.$viewValue.length; i++) {
                                scope.valueArray[i] = ngModel.$viewValue[i];
                            }
                            for (var j = ngModel.$viewValue.length; j < scope.valueArray.length; j++) {
                                scope.valueArray[j] = "";
                            }
                        } else {
                            scope.valueArray[0] = "";
                        }
                    };

                    scope.addValue = function () {
                        if(scope.valueArray.length < 5){
                            scope.valueArray.push("");
                        }
                    };

                    scope.deleteValue = function (i) {
                        if(scope.valueArray.length > 1){
                            scope.valueArray.splice(i, 1);
                            scope.setValue();
                        }
                    };

                    scope.setValue = function () {
                        var clearEmptyValue = [];
                        for (var i = 0; i < scope.valueArray.length; i++) {
                            if(scope.valueArray[i] && scope.valueArray[i] !== ""){
                                clearEmptyValue.push(scope.valueArray[i]);
                            }
                        }
                        ngModel.$setViewValue(clearEmptyValue);
                    }
                }
            };
        }
    ]);
})();