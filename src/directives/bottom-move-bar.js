(function () {
    keylolApp.directive('bottomMoveBar', () => {
        return {
            restrict: 'E',
            priority: -1,
            scope: {
                curTab: '<',
            },
            link (scope, element) {
                // 应对高延迟
                let trans = {};
                let transReady = false;
                let tabs = [];

                function calTrans() {
                    tabs = [];
                    element.siblings().each(function () {
                        tabs.push({
                            left: $(this).position().left + 15,
                            width: $(this).outerWidth(),
                        });
                    });

                    //初始化位置
                    const firstTab = tabs[0];
                    if (scope.curTab === undefined) {
                        element.css({
                            visibility: 'hidden',
                            width: firstTab.width,
                        });
                    } else if (tabs[scope.curTab] !== undefined) {
                        element.css({
                            visibility: 'visible',
                            transform: `translateX(${tabs[scope.curTab].left}px) scaleX(${tabs[scope.curTab].width / firstTab.width}`,
                            width: firstTab.width,
                        });
                    }

                    trans = [];
                    for (let i = 0; i !== tabs.length; i++) {
                        trans.push(`translateX(${tabs[i].left}px) scaleX(${tabs[i].width / firstTab.width})`);
                    }

                    transReady = true;
                }

                // if (scope.canResize) {
                //     const resizeHandler = $(window).on('resize', calTrans);
                //     scope.$on('$destroy', () => {
                //         $(window).unbind('resize', resizeHandler);
                //     });
                // }

                scope.$watch(() => {
                    return element.parent().width();
                }, (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        // dom位置可靠时设置转场动画
                        calTrans();
                    }
                });

                scope.$watch('curTab', (newValue, oldValue) => {
                    if (!transReady)
                        return;

                    if (oldValue === undefined && newValue !== undefined) {
                        element.css({
                            visibility: 'visible',
                            transform: trans[newValue],
                        });
                        return ;
                    }

                    if (oldValue !== undefined && newValue !== undefined && oldValue !== newValue) {
                        element.css({
                            visibility: 'visible',
                            transform: trans[newValue],
                        });
                    }
                });
            },
        };
    });
}());
