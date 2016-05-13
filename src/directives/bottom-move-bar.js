(function () {
    keylolApp.directive('bottomMoveBar', $timeout => {
        return {
            restrict: 'E',
            scope: {
              curTab: '@',
            },
            link (scope, element) {
                const jResizeHandler = () => {
                    const curElement = element.siblings().eq(scope.curTab);
                    const pWidth = element.parent().width();

                    element.css({
                        'left': curElement.position().left ,
                        'right': pWidth - curElement.position().left - curElement.get(0).clientWidth ,
                    });
                };

                $timeout(() => {
                    jResizeHandler();
                    const jWindow = $(window).resize(jResizeHandler);

                    element.siblings().click(function() {
                        if ($(this).index() === scope.curTab)
                            return ;
                        
                        const curElement = $(this);
                        const pWidth = element.parent().width();

                        const oldLeft = element.css('left').replace('px','');
                        const oldRight = element.css('right').replace('px','');
                        const newLeft = curElement.position().left;
                        const newRight = pWidth - curElement.position().left - curElement.outerWidth();

                        if (oldLeft < newLeft) {
                            element.animate({ 'right': newRight },{ duration:150, queue:false });
                            element.animate({ 'left': newLeft },{ duration:250, queue:false });
                        } else if (oldLeft > newLeft) {
                            element.animate({ 'left': newLeft },{ duration:150, queue:false });
                            element.animate({ 'right': newRight },{ duration:250, queue:false });
                        }
                    });

                    //remove the event listener on scope destroy
                    scope.$on('$destroy',() => {
                        jWindow.unbind('resize',jResizeHandler);
                    });
                });
            },
        };
    });
}());