(function () {
    keylolApp.directive('flashingFigure', () => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/flashing-figure.html',
            scope: {
                stations: '=',
                current: '=',
            },
        };
    });
}());
