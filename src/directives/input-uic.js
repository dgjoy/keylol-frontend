(function () {
    keylolApp.directive('inputUic', () => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/input-uic.html',
            scope: {
                length: '=',
                state: '<',
                blurHandler: '&',
                focusHandler: '&',
            },
            require: 'ngModel',
            link (scope, element, attrs, ngModel) {
                scope.repeats = new Array(scope.length); // For ng-repeat
                scope.text = {};
                scope.focus = new Array(length);


                const $uicBlur = $(document).click(e => {
                    const _con = $(element);   // 设置目标区域
                    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                        scope.blurHandler();
                        scope.$apply();
                    }
                });

                scope.$on('$destroy',() => {
                    $(document).unbind('click',$uicBlur);
                });

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
                scope.focusFirstIfEmpty = function (index) {
                    scope.focusHandler();
                    if (index === 0) {
                        return;
                    }
                    for (let l = 0; l < scope.length; ++l) {
                        if (scope.text[l])
                            return;
                    }
                    scope.focus[0] = true;
                };

                ngModel.$render = function () {
                    if (ngModel.$viewValue) {
                        for (let k = 0; k < scope.length; k++) {
                            scope.text[k] = ngModel.$viewValue[k];
                        }
                    }
                };

                for (let j = 0; j < scope.length; ++j) {
                    scope.$watch(`text[${j}]`, (newValue, oldValue) => {
                        // Get full text
                        let fullText = '';
                        for (let i = 0; i < scope.length; i++) {
                            if (scope.text[i]) {
                                fullText += scope.text[i][0];
                            }
                        }
                        ngModel.$setViewValue(fullText.toUpperCase());
                        if (newValue && (!oldValue || newValue.length >= oldValue.length))
                            scope.focus[j + 1] = true;
                    });
                }
            },
        };
    });
}());
