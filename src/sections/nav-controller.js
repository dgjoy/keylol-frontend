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
                this.inEntrance = true;
                this.tabArray = [
                    { state:'.discovery',name:'广场' },
                    { state:'.points',name:'据点' },
                    { state:'.timeline',name:'轨道' },
                ];
                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(9);
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
                });
            } else if (currentStateName.substr(0, 17) === 'aggregation.point') {
                this.inPoint = true;
                this.tabArray = [
                    { state:'.frontpage', name:'扉页' },
                    { state:'.intel', name:'情报' },
                    { state:'.frontpage', name:'轨道' },
                    { state:'.edit', name:'编辑', 'float':'right' },
                ];
                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(18);
                    switch (subState) {
                        case 'frontpage' :
                            this.currentPage = 0;
                            break;
                        case 'intel' :
                            this.currentPage = 1;
                            break;
                        case 'edit' :
                            this.currentPage = 3;
                            break;
                    }
                });
            }
        }
    }

    keylolApp.component('nav', {
        templateUrl: 'src/sections/nav.html',
        controller: NavController,
        controllerAs: 'nav',
        bindings: {
            theme: '<',
        },
    });
}());
