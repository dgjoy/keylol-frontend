(function() {
    "use strict";

    keylolApp.directive("flashingFigure", [
        function() {
            return {
                restrict: "E",
                templateUrl: "components/directives/flashing-figure.html",
                scope: {
                    stations: "=",
                    current: "="
                }
            };
        }
    ]);
})();