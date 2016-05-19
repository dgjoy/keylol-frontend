/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class pointHeaderController {
        constructor($scope, $window, $timeout) {
            const $$window = $($window);
            let scrollTop = $$window.scrollTop();
            const scrollCallback = () => {
                scrollTop = $$window.scrollTop();
                if (scrollTop < 464) {
                    $scope.$apply(() => {
                        this.transform = `translateY(${scrollTop / 2}px)`;
                    });
                }
            };
            $$window.scroll(scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });

            if (scrollTop < 464) {
                this.transform = `translateY(${scrollTop / 2}px)`;
            } else {
                this.transform = 'translateY(132px)';
            }
        }
    }

    keylolApp.component('pointHeader', {
        templateUrl: 'src/sections/point-header.html',
        controller: pointHeaderController,
        controllerAs: 'pointHeader',
        bindings: {
            theme: '<',
        },
    });
}());
