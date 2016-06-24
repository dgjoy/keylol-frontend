(function () {
    keylolApp.directive('captureClick', ['$parse', $parse => {
        return {
            restrict: 'A',
            compile (element, attrs) {
                const fn = $parse(attrs.captureClick, null, true);
                return function (scope, element) {
                    element[0].addEventListener('click', event => {
                        scope.$apply(() => {
                            fn(scope, { $event: event });
                        });
                    }, true);
                };
            },
        };
    }]);
}());
