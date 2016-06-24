(function () {
    keylolApp.directive('proCon', () => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/pro-con.html',
            scope: { isNegative: '=' },
            require: 'ngModel',
            link (scope, element, attrs, ngModel) {
                scope.proConString = scope.isNegative ? '缺' : '亮';
                scope.valueArray = [];

                ngModel.$render = () => {
                    if (ngModel.$viewValue && ngModel.$viewValue.length > 0) {
                        for (let i = 0; i < scope.valueArray.length; i++) {
                            scope.valueArray[i] = i < ngModel.$viewValue.length ? ngModel.$viewValue[i] : '';
                        }
                    } else {
                        scope.valueArray[0] = '';
                    }
                };

                scope.addValue = function () {
                    if (scope.valueArray.length < 5) {
                        scope.valueArray.push('');
                    }
                };

                scope.deleteValue = function (i) {
                    if (scope.valueArray.length > 1) {
                        scope.valueArray.splice(i, 1);
                        scope.setValue();
                    }
                };

                scope.setValue = function () {
                    const clearEmptyValue = [];
                    for (let i = 0; i < scope.valueArray.length; i++) {
                        if (scope.valueArray[i] && scope.valueArray[i] !== '') {
                            clearEmptyValue.push(scope.valueArray[i]);
                        }
                    }
                    ngModel.$setViewValue(clearEmptyValue);
                };
            },
        };
    });
}());
