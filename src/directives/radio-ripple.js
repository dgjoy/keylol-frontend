/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    keylolApp.directive('radioRipple', ($timeout, utils) => {
        return {
            scope : {
                index: '<radioRipple',
            },
            restrict: 'A',
            priority: 1,
            link (scope, element) {
                const func = (e, content) => {
                    if (content.index === scope.index) {
                        const newEle = $(`<div class="circle-ripple ${content.color}"></div>`).appendTo(element.find('.ripple-container'));
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
