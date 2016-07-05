(function () {
    class NavController {
        constructor ($scope, $window, $state, stateTree, $location, $timeout, notification, $rootScope) {
            const $$window = $($window);

            let scrollToTopCheckTimeout;
            let lastScrollTop = 0;
            const scrollCallback = () => {
                const scrollTop = $$window.scrollTop();
                const newHasShadow = scrollTop > 0;
                if (this.hasShadow !== newHasShadow) {
                    $scope.$apply(() => {
                        this.hasShadow = newHasShadow;
                    });
                }
                if (scrollTop > lastScrollTop) this.scrollNotificationLock = false;
                if (!scrollToTopCheckTimeout && !this.scrollNotificationLock) {
                    scrollToTopCheckTimeout = $timeout(() => {
                        if (scrollTop - $$window.scrollTop() > 800) {
                            notification.default({ message: '双击导航栏可以快速返回顶部' });
                            this.scrollNotificationLock = true;
                        }
                        scrollToTopCheckTimeout = null;
                    }, 500, false);
                }
                lastScrollTop = scrollTop;
            };
            $$window.scroll(scrollCallback);

            $rootScope.$on('scrollToElementStart', () => {
                this.scrollNotificationLock = true;
            });

            $rootScope.$on('scrollToElementSuccess', () => {
                this.scrollNotificationLock = false;
            });

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });

            $scope.stateTree = stateTree;

            const currentStateName = $state.current.name;
            if (currentStateName.substr(0, 8) === 'entrance') {
                this.hasFakeTabs = true;
                this.tabArray = [
                    { state:'.discovery', name:'广场' },
                    { state:'.points', name:'据点' },
                ];
                const timelineEntrance = { state:'.timeline',name:'轨道' };

                $scope.$watch('stateTree.currentUser', newValue => {
                    if (newValue) {
                        if (this.tabArray.indexOf(timelineEntrance) === -1) {
                            this.tabArray.push(timelineEntrance);
                        }
                    }
                });

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
                    ];
                } else {
                    this.tabArray = [
                        { state: '.frontpage', name: '扉页' },
                        { state: '.product', name: '作品' },
                        { state: '.timeline', name: '轨道' },
                    ];
                }
                const editEntrance = { state: '.edit', name: '编辑', 'float': 'right' };

                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(18);
                    switch (subState) {
                        case 'frontpage' :
                            this.currentPage = 0;
                            if (this.tabArray.indexOf(editEntrance) > -1) {
                                this.tabArray.splice(this.tabArray.indexOf(editEntrance), 1);
                            }
                            break;
                        case 'intel' :
                        case 'product' :
                            this.currentPage = 1;
                            if (this.tabArray.indexOf(editEntrance) > -1) {
                                this.tabArray.splice(this.tabArray.indexOf(editEntrance), 1);
                            }
                            break;
                        case 'timeline' :
                            this.currentPage = 2;
                            if (this.tabArray.indexOf(editEntrance) > -1) {
                                this.tabArray.splice(this.tabArray.indexOf(editEntrance), 1);
                            }
                            break;
                        case 'edit' :
                        case 'edit.info' :
                        case 'edit.style' :
                            if (this.tabArray.indexOf(editEntrance) === -1) {
                                this.tabArray.push(editEntrance);
                            }
                            this.currentPage = 3;
                            break;
                    }
                });
            } else if (currentStateName.substr(0, 16) === 'aggregation.user') {
                this.inUser = true;
                this.tabArray = [
                    { state: '.dossier', name: '档案' },
                    { state: '.people', name: '人脉' },
                    { state: '.timeline', name: '轨道' },
                ];
                const editEntrance = { state: '.edit', name: '编辑', 'float': 'right' };

                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(17);
                    switch (subState) {
                        case 'dossier' :
                            this.currentPage = 0;
                            if (this.tabArray.indexOf(editEntrance) > -1) {
                                this.tabArray.splice(this.tabArray.indexOf(editEntrance), 1);
                            }
                            break;
                        case 'people' :
                            this.currentPage = 1;
                            if (this.tabArray.indexOf(editEntrance) > -1) {
                                this.tabArray.splice(this.tabArray.indexOf(editEntrance), 1);
                            }
                            break;
                        case 'timeline' :
                            this.currentPage = 2;
                            if (this.tabArray.indexOf(editEntrance) > -1) {
                                this.tabArray.splice(this.tabArray.indexOf(editEntrance), 1);
                            }
                            break;
                        case 'edit' :
                        case 'edit.info' :
                        case 'edit.preference' :
                            if (this.tabArray.indexOf(editEntrance) === -1) {
                                this.tabArray.push(editEntrance);
                            }
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
                            ]);
                        } else {
                            Array.prototype.push.apply(this.tabArray, [
                                { href: `point/${newValue.idCode}/frontpage`, name: '扉页' },
                                { href: `point/${newValue.idCode}/product`, name: '作品' },
                                { href: `point/${newValue.idCode}/timeline`, name: '轨道' },
                            ]);
                        }
                    }
                });
            } else if (currentStateName.substr(0,11) === 'post-office') {
                this.hasFakeTabs = true;
                $scope.$watch(() => {
                    return stateTree.currentUser;
                },() => {
                    if (!$.isEmptyObject(stateTree.currentUser)) {
                        this.tabArray = [
                            { state: '.unread',name: `未读 ${stateTree.currentUser.messageCount} 则` , 'float': 'left' },
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
                this.hasFakeTabs = true;
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
            } else if (currentStateName.substr(0, 6) === 'search') {
                this.hasFakeTabs = true;
                this.tabArray = [
                    { href: 'search/point/', name:'据点' },
                    { href: 'search/article/', name:'文章' },
                    { href: 'search/user/', name:'用户' },
                ];

                $scope.$watch(() => {
                    return $state.current.name;
                }, () => {
                    const subState = $state.current.name.substr(7);
                    switch (subState) {
                        case 'point' :
                            this.currentPage = 0;
                            break;
                        case 'article' :
                            this.currentPage = 1;
                            break;
                        case 'user' :
                            this.currentPage = 2;
                            break;
                    }

                    const keyword = $state.params.keyword;
                    if (keyword) {
                        this.tabArray[0].href = this.tabArray[0].href.substr(0, 13) + keyword;
                        this.tabArray[1].href = this.tabArray[1].href.substr(0, 15) + keyword;
                        this.tabArray[2].href = this.tabArray[2].href.substr(0, 12) + keyword;
                    }
                });
            }
        }

        scrollToTop(event) {
            this.scrollNotificationLock = true;
            $('html, body').animate({
                scrollTop: 0,
            }, {
                duration: 500,
                always: () => {
                    this.scrollNotificationLock = false;
                },
            });
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
