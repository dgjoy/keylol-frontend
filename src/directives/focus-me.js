(function () {
    keylolApp.directive('focusMe', ['$parse', $parse => {
        return {
            link (scope, element, attrs) {
                scope.$watch(attrs.focusMe, value => {
                    if (value === true) {
                        $('html, body').animate({
                            scrollTop: element.offset().top - 64,
                        }, () => {
                            element[0].focus();
                            $parse(attrs.focusMe).assign(scope, false);
                        });
                    }
                });
            },
        };
    }]);
}());
