(function () {
    keylolApp.directive('spoiler', (stateTree, union, utils) => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/spoiler.html',
            transclude: true,
            link (scope, element) {
                element.addClass('actionable');
                element.click(() => {
                    element.removeClass('actionable');
                    element.find('.hint').remove();
                    element.find('.content').children().unwrap();
                    element.off('click');
                    
                    if (union.updateCommentsHeight) {
                        union.updateCommentsHeight();
                    }
                });

                scope.stateTree = stateTree;
                scope.utils = utils;
            },
        };
    });
}());
