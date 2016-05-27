/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    keylolApp.directive('circleRipple', ($timeout, utils) => {
        return {
            scope : {
                theme: '<rippleTheme',
                index: '<circleRipple',
            },
            restrict: 'A',
            priority: 1,
            link (scope, element) {
                let alpha = null;
                if (scope.theme !== undefined) {
                    alpha = `rgba(${utils.hexToRgb(scope.theme)},.1)`;
                }
                
                const func = (e, content) => {
                    if (content.index === scope.index) {
                        let diy = '';
                        if (alpha !== null && content.state === 'theme') {
                            diy = `style="background-color:${alpha};"`;
                        }
                        const newEle = $(`<div ${diy} class="circle-ripple ${content.state}"></div>`).appendTo(element.find('.ripple-container'));
                        newEle.one('animationend webkitAnimationEnd',() => {
                            newEle.remove();
                        });
                    }
                };
                
                scope.$on('rippleEvent', func);
            },
        };
    });
}());
