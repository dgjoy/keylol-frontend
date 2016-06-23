(function () {
    class NavController {
        constructor ($scope, $window, $state, stateTree, $location) {
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

            $scope.stateTree = stateTree;

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
                if (stateTree.aggregation.point.basicInfo.type === 'game' || stateTree.aggregation.point.basicInfo.type === 'hardware') {
                    this.tabArray = [
                        { state: '.frontpage', name: '扉页' },
                        { state: '.intel', name: '情报' },
                        { state: '.timeline', name: '轨道' },
                        { state: '.edit', name: '编辑', 'float': 'right' },
                    ];
                } else {
                    this.tabArray = [
                        { state: '.frontpage', name: '扉页' },
                        { state: '.product', name: '作品' },
                        { state: '.timeline', name: '轨道' },
                        { state: '.edit', name: '编辑', 'float': 'right' },
                    ];
                }
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
                $scope.$watch(() => {
                    return stateTree.currentUser;
                },() => {
                    if (!stateTree.currentUser || (stateTree.currentUser && stateTree.currentUser.id !==  stateTree.aggregation.user.basicInfo.id && $.inArray('Operator', stateTree.currentUser.roles) === -1)) {
                        this.tabArray = [
                            { state: '.dossier', name: '档案' },
                            { state: '.people', name: '人脉' },
                            { state: '.timeline', name: '轨道' },
                        ];
                    } else {
                        this.tabArray = [
                            { state: '.dossier', name: '档案' },
                            { state: '.people', name: '人脉' },
                            { state: '.timeline', name: '轨道' },
                            { state: '.edit', name: '编辑', 'float': 'right' },
                        ];
                    }
                });

                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(17);
                    switch (subState) {
                        case 'dossier' :
                            this.currentPage = 0;
                            break;
                        case 'people' :
                            this.currentPage = 1;
                            break;
                        case 'edit' :
                        case 'edit.info' :
                        case 'edit.preference' :
                            this.currentPage = 3;
                            break;
                    }
                });
            } else if (currentStateName.substr(0, 7) === 'content') {
                this.inPoint = true;
                let name, watchName;
                if (currentStateName.substr(8, 15) === 'article') {
                    name = '文章';
                    watchName = 'article';
                } else if (currentStateName.substr(8, 16) === 'activity') {
                    name = '动态';
                    watchName = 'activity';
                }

                this.tabArray = [
                    { name, 'float': 'left', href: $location.url() },
                ];
                this.currentPage = 0;
                $scope.$watch(`stateTree.content.${watchName}.pointBasicInfo`, newValue => {
                    if (newValue && newValue.idCode) {
                        if (newValue.type === 'game' || newValue.type === 'hardware') {
                            Array.prototype.push.apply(this.tabArray, [
                                { href: `point/${newValue.idCode}/frontpage`, name: '扉页' },
                                { href: `point/${newValue.idCode}/intel`, name: '情报' },
                                { href: `point/${newValue.idCode}/timeline`, name: '轨道' },
                                { href: `point/${newValue.idCode}/edit`, name: '编辑', 'float': 'right' },
                            ]);
                        } else {
                            Array.prototype.push.apply(this.tabArray, [
                                { href: `point/${newValue.idCode}/frontpage`, name: '扉页' },
                                { href: `point/${newValue.idCode}/product`, name: '作品' },
                                { href: `point/${newValue.idCode}/timeline`, name: '轨道' },
                                { href: `point/${newValue.idCode}/edit`, name: '编辑', 'float': 'right' },
                            ]);
                        }
                    }
                });
            } else if (currentStateName.substr(0,11) === 'post-office') {
                this.inEntrance = true;
                $scope.$watch(() => {
                    return stateTree.currentUser;
                },() => {
                    if (stateTree.currentUser) {
                        this.tabArray = [
                            { state: '.unread',name: `未读 ${stateTree.currentUser.messageCount} 则` , float: 'left' },
                            { state: '.social-activity',name:'社交' },
                            { state: '.missive',name:'公函' },
                        ];
                        $scope.$watch(() => {
                            return $state.current.name;
                        }, () => {
                            const subState = $state.current.name.substr(12);
                            switch (subState) {
                                case 'unread' :
                                    this.currentPage = 0;
                                    break;
                                case 'social-activity' :
                                case 'social-activity.approve':
                                case 'social-activity.reply':
                                case 'social-activity.follower':
                                    this.currentPage = 1;
                                    break;
                                case 'missive' :
                                    this.currentPage = 2;
                                    break;
                            }
                        });
                    }
                });
            } else if (currentStateName.substr(0,6) === 'coupon') {
                this.inEntrance = true;
                this.tabArray = [
                    { state: '.detail', name:'明细' },
                    // { state: '.store', name:'商店' },
                    { state: '.ranking', name:'排行' },
                ];

                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(7);
                    switch (subState) {
                        case 'detail' :
                            this.currentPage = 0;
                            break;
                        // case 'store' :
                        //     this.currentPage = 1;
                        //     break;
                        case 'ranking' :
                            this.currentPage = 1;
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
