(function () {
    "use strict";

    keylolApp.directive('captureClick', [
        "$parse",
        function ($parse) {
            return {
                restrict: 'A',
                compile: function (element, attrs) {
                    var fn = $parse(attrs.captureClick, null, true);
                    return function (scope, element) {
                        element[0].addEventListener('click', function (event) {
                            scope.$apply(function () {
                                fn(scope, {$event: event});
                            });
                        }, true);
                    };
                }
            }
        }
    ]);
})();