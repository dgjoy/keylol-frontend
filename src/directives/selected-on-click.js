(function () {
    keylolApp.directive('selectedOnClick', () => {
        return {
            restrict: 'A',
            link (scope, element, attrs) {
                element.on('click', () => {
                    this.setSelectionRange(0, this.value.length);
                });
            },
        };
    });
}());
