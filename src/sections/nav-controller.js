(function () {
    class NavController {
        constructor ($scope, $window, $state, stateTree) {
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
                    { state:'.timeline', name:'轨道' },
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
                        case 'edit.info' :
                        case 'edit.style' :
                            this.currentPage = 3;
                            break;
                    }
                });
            } else if (currentStateName.substr(0, 16) === 'aggregation.user') {
                this.inUser = true;
                this.tabArray = [
                    { state: '.dossier', name: '档案' },
                    { state: '.timeline', name: '轨道' },
                    { state: '.edit', name: '编辑', 'float': 'right' },
                ];
                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(17);
                    switch (subState) {
                        case 'dossier' :
                            this.currentPage = 0;
                            break;
                        case 'edit' :
                            this.currentPage = 2;
                            break;
                    }
                });
            } else if (currentStateName.substr(0,7) === 'article') {
                this.inPoint = true;
                this.tabArray = [
                    { name:'文章' },
                ];
                this.currentPage = 0;
            } else if (currentStateName.substr(0,8) === 'activity') {
                this.inPoint = true;
                this.tabArray = [
                    { name:'动态' },
                ];
                this.currentPage = 0;
            } else if (currentStateName.substr(0,10) === 'postOffice') {
                this.inEntrance = true;
                this.tabArray = [
                    { state: '.socialActivity',name:'社交' },
                    { state: '.missive',name:'公函' },
                ];
                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(11);
                    switch (subState) {
                        case 'socialActivity' :
                            this.currentPage = 0;
                            break;
                        case 'missive' :
                            this.currentPage = 1;
                            break;
                    }
                });
            }

            $scope.stateTree = stateTree;
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
