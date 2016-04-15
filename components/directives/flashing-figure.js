(function () {
    keylolApp.directive("flashingFigure", () => {
        return {
            restrict: "E",
            templateUrl: "components/directives/flashing-figure.html",
            scope: {
                stations: "=",
                current: "=",
            },
        };
    });
}());
