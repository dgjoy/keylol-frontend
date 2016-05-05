(function () {
    class tabsController {
        constructor ($scope, union, $http, apiEndpoint, notification, $timeout) {

            const jResizeHandler = () => {
                const curElement = $('.link').eq(this.curTab);
                this.pWidth = curElement.parent().width();

                $('.move-bar').css({
                    'left': curElement.position().left ,
                    'right': this.pWidth - curElement.position().left - curElement.get(0).clientWidth ,
                });
            };

            $timeout(jResizeHandler);
            const jWindow = $(window).resize(jResizeHandler);
            $scope.$on('$destroy',() => {
                jWindow.unbind('resize',jResizeHandler);
            });
        }

        moveBar(index) {
            if (this.curTab === index)
                return ;
            
            this.curTab = index;

            const jLinks = $('.link');
            const jMoveBar = $('.move-bar');

            const curElement = jLinks.eq(index);
            const oldLeft = jMoveBar.css('left').replace('px','');
            const oldRight = jMoveBar.css('right').replace('px','');
            const newLeft = curElement.position().left;
            const newRight = this.pWidth - curElement.position().left - curElement.outerWidth();

            if (oldLeft < newLeft) {
                jMoveBar.animate({'right': newRight,},{duration:150, queue:false,});
                jMoveBar.animate({'left': newLeft,},{duration:250, queue:false,});
            } else if (oldLeft > newLeft) {
                jMoveBar.animate({'left': newLeft,},{duration:150, queue:false,});
                jMoveBar.animate({'right': newRight,},{duration:250, queue:false,});
            }
        }
    }

    keylolApp.component('tabs', {
        templateUrl: 'src/components/tabs.html',
        controller: tabsController,
        controllerAs: 'tabs',
        bindings:{
            tabArray: '<',
            curTab: '@',
        },
    });
}());
