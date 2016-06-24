/**
 * Created by Rex on 15/9/23.
 */
(function () {
    class userHeaderController {
        constructor($scope, $window, utils, stateTree, $location) {
            this.stateTree = stateTree;
            this.$location = $location;
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

            this.subscribe = utils.subscribe;
            this.openRegistration = utils.openRegistration;

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

        edit () {
            this.$location.url(`user/${this.object.idCode}/edit`);
        }

        showMenu($event) {
            this.showMenuPopup({
                templateUrl: 'src/popup/point-header-menu.html',
                controller: 'PointHeaderMenuController as pointHeaderMenu',
                event: $event,
                attachSide: 'bottom',
                align: 'right',
                offsetX: 0,
                offsetY: -24,
                inputs: {
                    actions: [() => {
                        this.$location.url(`user/${this.object.idCode}/edit`);
                    }],
                },
            });
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
