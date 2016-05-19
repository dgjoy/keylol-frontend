/**
 * Created by ZenDay on 2016/5/3.
 */
(function () {
    keylolApp.directive('radioRipple', ($timeout, utils) => {
        return {
            scope : {
                type: '@radioRipple',
            },
            restrict: 'A',
            link (scope, element) {
                const func = () => {
                    const newEle = $(`<div class="circle-ripple ${scope.type === undefined ? 'inertia' : scope.type}"></div>`).appendTo(element.find('.ripple-container'));
                    newEle.one('animationend webkitAnimationEnd',() => {
                       newEle.remove();
                    });
                };
                
                element.on('touchstart mousedown', func);

                //remove the event listener on scope destroy
                scope.$on('$destroy',() => {
                    element.off('touchstart mousedown', func);
                });
            },
        };
    });
}());
