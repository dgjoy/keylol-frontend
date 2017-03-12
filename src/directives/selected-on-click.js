(function () {
    keylolApp.directive('selectedOnClick', () => {
        return {
            restrict: 'A',
            link (scope, element, attrs) {
                if (attrs.selectedOnClick) {
                    element.on('click', function () {
                        this.setSelectionRange(0, this.value.length);
                    });
                }
            },
        };
    });
}());
