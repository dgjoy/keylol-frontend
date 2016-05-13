(function () {
    keylolApp.directive('window', ['$timeout', ($timeout) => {
        let exitFocus;
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'src/directives/window.html',
            scope: {
                position: '@',
                clickOtherToExit: '<',
            },
            compile () {
                return {
                    post (scope, element) {
                        exitFocus = angular.element(element[0].querySelector('.window-exit-button'));
                        if (!scope.clickOtherToExit) {
                            element.on('click', e => {
                                if (e.target === element[0]) {
                                    if (!exitFocus.hasClass('focused')) {
                                        exitFocus.addClass('focused');
                                        $timeout(() => {
                                            exitFocus.removeClass('focused');
                                        }, 900);
                                    }
                                }
                            });
                        } else {
                            element.on('click', e => {
                                if (e.target === element[0]) {
                                    exitFocus.click();
                                }
                            });
                        }
                    },
                };
            },
        };
    }]);
}());
