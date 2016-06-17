(function () {
    keylolApp.controller('RootController',
        ($scope, pageHead, union, $http, apiEndpoint, $window, notification, $location, $rootScope, $state, stateTree, $stateParams) => {
            pageHead.loading();

            let firstLoad = true;
            $scope.$watch(() => {
                return union.$localStorage.Authorization;
            },newToken => {
                if (newToken) {
                    $http.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                } else {
                    _czc.push(['_setCustomVar', '登录用户', '游客', 1]);
                    for (const i in union.$localStorage) {
                        if (union.$localStorage.hasOwnProperty(i) && i.indexOf('$') !== 0)
                            delete union.$localStorage[i];
                    }
                    for (const i in union.$sessionStorage) {
                        if (union.$sessionStorage.hasOwnProperty(i) && i.indexOf('$') !== 0)
                            delete union.$sessionStorage[i];
                    }
                    console.log(stateTree);
                    if (stateTree.currentUser) {
                        delete stateTree.currentUser;
                        delete $http.defaults.headers.common.Authorization;
                    }
                }
                if (!firstLoad) {
                    stateTree.empty = true;
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true, location: false,
                    });
                } else {
                    firstLoad = false;
                }
            });

            $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                // 如果是从子状态跳出至父状态，则阻止其发生
                if (fromState.name.includes(toState.name) && fromState.name !== toState.name) {
                    let flag = true;
                    for (const attr in toParams) {
                        if (toParams.hasOwnProperty(attr) && toParams[attr] !== fromParams[attr]) {
                            flag = false;
                        }
                    }
                    if (flag) {
                        for (const attr in fromParams) {
                            if (fromParams.hasOwnProperty(attr) && fromParams[attr] !== toParams[attr]) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            event.preventDefault();
                            console.log('prevent change');
                        }
                    }
                }
            });

            $rootScope.$on('$stateChangeSuccess', () => {
                $window.scrollTo(0, 0);
                console.log($state.current);
            });
    });
}());
