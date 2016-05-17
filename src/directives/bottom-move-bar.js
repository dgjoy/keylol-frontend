(function () {
    keylolApp.directive('bottomMoveBar', $timeout => {
        return {
            restrict: 'E',
            scope: {
              curTab: '<',
            },
            link (scope, element) {
                $timeout(() => {
                    const pWidth = element.parent().width();

                    const tabs = [];
                    element.siblings().each(function() {
                        tabs.push({
                            right: pWidth - $(this).position().left - $(this).outerWidth(),
                            left: $(this).position().left,
                        });
                    });

                    scope.$watch(() => {
                        return scope.curTab;
                    },(newValue, oldValue) => {
                        if (newValue > oldValue) {
                            element.addClass('to-right');
                            element.removeClass('to-left');
                        } else {
                            element.addClass('to-left');
                            element.removeClass('to-right');
                        }
                        element.css({
                            'right': tabs[newValue].right,
                            'left': tabs[newValue].left,
                        });
                    });
                });
            },
        };
    });
}());