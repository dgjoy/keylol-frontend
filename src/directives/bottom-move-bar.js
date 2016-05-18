(function () {
    keylolApp.directive('bottomMoveBar', $timeout => {
        return {
            restrict: 'E',
            scope: {
              curTab: '<',
            },
            link (scope, element) {
                let trans = {};
                let transReady = false;

                scope.$watch(() => {
                    return element.parent().width();
                }, (newValue, oldValue) => {
                    if (newValue !== oldValue) {
                        // dom位置可靠时设置转场动画
                        const pWidth = element.parent().parent().width();

                        const tabs = [];
                        element.siblings().each(function () {
                            tabs.push({
                                end: $(this).position().left + $(this).outerWidth(),
                                begin: $(this).position().left + 15,
                                width: $(this).outerWidth(),
                            });
                        });

                        //初始化位置
                        const firstTab = tabs[0];

                        if (scope.curTab === undefined) {
                            element.css({
                                width: firstTab.width,
                                transform: `translateX(-${firstTab.end}px)`,
                            });
                        } else {
                            element.css({
                                width: firstTab.width,
                                transform: `translateX(${tabs[scope.curTab].begin}px) scaleX(${tabs[scope.curTab].width / firstTab.width})`,
                            });
                        }

                        trans = {};
                        //两阶段transition制作
                        for (let i = 0; i !== tabs.length; i++) {
                            for (let j = 0; j !== tabs.length; j++) {
                                if (i !== j) {
                                    trans[`${i}-${j}`] = [];
                                    if (tabs[i].end < tabs[j].end) {
                                        trans[`${i}-${j}`].push(`translateX(${tabs[i].begin + (tabs[j].begin - tabs[i].begin) / 2}px) scaleX(${(tabs[j].end - tabs[i].begin) * 0.6 / firstTab.width})`);
                                        trans[`${i}-${j}`].push(`translateX(${tabs[j].begin}px) scaleX(${tabs[j].width / firstTab.width})`);
                                    } else {
                                        trans[`${i}-${j}`].push(`translateX(${tabs[j].begin + (tabs[i].begin - tabs[j].begin) / 2}px) scaleX(${(tabs[i].end - tabs[j].begin) * 0.6 / firstTab.width})`);
                                        trans[`${i}-${j}`].push(`translateX(${tabs[j].begin}px) scaleX(${tabs[j].width / firstTab.width})`);
                                    }
                                }
                            }
                        }
                        transReady = true;
                    }
                });

                scope.$watch('curTab', (newValue, oldValue) => {
                    if (newValue !== undefined && oldValue !== newValue) {
                        if (!transReady)
                            return;
                        element.removeClass('two-phase');
                        element.css({
                            'transform': trans[`${oldValue}-${newValue}`][0],
                        });
                        $timeout(() => {
                            element.addClass('two-phase');
                            element.css({
                                'transform': trans[`${oldValue}-${newValue}`][1],
                            });
                        },100);
                    }
                });
            },
        };
    });
}());