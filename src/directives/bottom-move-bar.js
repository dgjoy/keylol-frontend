(function () {
    keylolApp.directive('bottomMoveBar', $timeout => {
        return {
            restrict: 'E',
            scope: {
              curTab: '<',
            },
            link (scope, element) {
                $timeout(() => {
                    const pWidth = element.parent().parent().width();

                    const tabs = [];
                    element.siblings().each(function() {
                        tabs.push({
                            end: $(this).position().left + $(this).outerWidth(),
                            begin: $(this).position().left + 15,
                            width: $(this).outerWidth(),
                        });
                    });

                    //初始化位置
                    const firstTab = tabs[0];
                    element.css({
                        width: firstTab.width,
                        transform: `translateX(${firstTab.begin}px)`,
                    });

                    const trans = {};
                    //两阶段transition制作
                    for (let i = 0;i !== tabs.length;i++) {
                        for (let j = 0;j !== tabs.length;j++) {
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

                    scope.$watch(() => {
                        return scope.curTab;
                    },(newValue, oldValue) => {
                        if (newValue === oldValue) {
                            return;
                        }
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
                    });
                });
            },
        };
    });
}());