(function () {
    class NavController {
        constructor ($scope, $window, $state) {
            const $$window = $($window);
            const scrollCallback = () => {
                const newHasShadow = $$window.scrollTop() > 0;
                if (this.hasShadow !== newHasShadow) {
                    $scope.$apply(() => {
                        this.hasShadow = newHasShadow;
                    });
                }
            };
            $$window.scroll(scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });

            const currentStateName = $state.current.name;
            if (currentStateName.substr(0, 8) === 'entrance') {
                this.tabArray = [{ href:'discovery',name:'广场' },{ href:'points',name:'据点' },{ href:'timeline',name:'轨道' }];
                const subState = currentStateName.substr(9);
                switch (subState) {
                    case 'discovery' :
                        this.currentPage = 0;
                        break;
                    case 'points' :
                        this.currentPage = 1;
                        break;
                    case 'timeline' :
                        this.currentPage = 2;
                        break;
                }
            }
        }
    }

    keylolApp.component('nav', {
        templateUrl: 'src/sections/nav.html',
        controller: NavController,
        controllerAs: 'nav',
    });
}());
