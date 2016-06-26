(function () {
    keylolApp.controller('RootController',
        ($scope, pageHead, union, $http, apiEndpoint, $window, notification, $location, $rootScope, $state, stateTree, $analytics, $injector) => {
            pageHead.loading();

            let firstLoad = true;
            $scope.$watch(() => {
                return union.$localStorage.Authorization;
            },newToken => {
                if (newToken) {
                    $http.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                } else {
                    $analytics.setUsername('游客');
                    for (const i in union.$localStorage) {
                        if (union.$localStorage.hasOwnProperty(i) && i.indexOf('$') !== 0)
                            delete union.$localStorage[i];
                    }
                    for (const i in union.$sessionStorage) {
                        if (union.$sessionStorage.hasOwnProperty(i) && i.indexOf('$') !== 0)
                            delete union.$sessionStorage[i];
                    }
                    if (stateTree.currentUser) {
                        delete stateTree.currentUser;
                        delete $http.defaults.headers.common.Authorization;
                    }
                }
                if (!firstLoad) {
                    stateTree.empty = true;
                    $state.reload();
                } else {
                    firstLoad = false;
                }
            });

            const paramsOut = ['entrance', 'route'];

            $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                // 如果是从子状态跳出至父状态，则阻止其发生
                if (fromState.name.includes(toState.name) && fromState.name !== toState.name) {
                    let flag = true;
                    for (const attr in toParams) {
                        if (toParams.hasOwnProperty(attr) && paramsOut.indexOf(attr) === -1 && toParams[attr] !== fromParams[attr]) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        for (const attr in fromParams) {
                            if (fromParams.hasOwnProperty(attr) && paramsOut.indexOf(attr) === -1 && fromParams[attr] !== toParams[attr]) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            event.preventDefault();
                            $state.go(toState.name, toParams, { notify: false }).then(current => {
                                if (typeof current.onEnter === 'function') {
                                    $injector.invoke(current.onEnter);
                                }
                            });
                        }
                    }
                }

                $($window).unbind('scroll.loadTimeline');
            });

            $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
                $window.scrollTo(0, 0);
            });
    });
}());
