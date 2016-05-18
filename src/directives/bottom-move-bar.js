(function () {
    keylolApp.directive('bottomMoveBar', $timeout => {
        return {
            restrict: 'E',
            scope: {
              curTab: '<',
            },
            link (scope, element) {
                // 应对高延迟
                let trans = {};
                let transReady = false;
                let tabs = [];

                scope.$watch(() => {
                    return element.parent().width();
                }, (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        // dom位置可靠时设置转场动画
                        const pWidth = element.parent().parent().width();

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
                                width: firstTab.width,
                            });
                        } else {
                            element.css({
                                transform: `translateX(${tabs[scope.curTab].left}px)`,
                                width: firstTab.width,
                            });
                        }

                        trans = [];
                        for (let i = 0; i !== tabs.length; i++) {
                            trans.push(`translateX(${tabs[i].left}px) scaleX(${tabs[i].width / firstTab.width})`);
                        }

                        transReady = true;
                    }
                });

                scope.$watch('curTab', (newValue, oldValue) => {
                    if (oldValue === undefined && newValue !== undefined) {
                        element.css({
                            transform: `translateX(${tabs[newValue].left}px)`,
                        });
                        return ;
                    }

                    if (oldValue !== undefined && newValue !== undefined && oldValue !== newValue) {
                        if (!transReady)
                            return;
                        element.css({
                            'transform': trans[newValue],
                        });
                    }
                });
            },
        };
    });
}());