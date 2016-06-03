(function () {
    keylolApp.directive('inputCheckbox', () => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/input-checkbox.html',
            scope: {
                names: '<',
                theme: '<',
            },
            require: 'ngModel',
            link (scope, element, attrs, ngModel) {
                let model = [];

                ngModel.$render = () => {
                    if (ngModel.$viewValue) {
                        model = ngModel.$viewValue;
                    }
                };

                scope.toggle = $index => {
                    const index = model.indexOf($index);
                    if (index > -1) {
                        model.splice(index, 1);
                    } else {
                        model.push($index);
                    }
                    ngModel.$setViewValue(model);
                };

                scope.exists = $index => {
                    return model.indexOf($index) > -1;
                };
            },
        };
    });
}());
