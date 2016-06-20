/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class userHeaderController {
        constructor($scope, $window) {
            this.subscribeSet = [
                {
                    text: '关注',
                    type: 'theme',
                },
                {
                    text: '取关',
                    type: 'light-text',
                },
            ];

            this.subscribe = () => {
                
            };

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

    keylolApp.component('userHeader', {
        templateUrl: 'src/sections/user-header.html',
        controller: userHeaderController,
        controllerAs: 'userHeader',
        bindings: {
            theme: '<',
            object: '<',
        },
    });
}());
