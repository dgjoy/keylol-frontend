(function () {
    keylolApp.controller('RootController', [
        '$scope', 'pageHead', 'union', '$http', 'apiEndpoint', '$window',
        'notification', '$location', '$rootScope', '$state',
        ($scope, pageHead, union, $http, apiEndpoint, $window,
         notification, $location, $rootScope, $state) => {
            pageHead.loading();

            let aNewLogin = false;

            let firstLoad = true;
            $scope.$watch(() => {
                return union.$localStorage.Authorization;
            },newToken => {
                if (newToken) {
                    if (!firstLoad) {
                        aNewLogin = true;
                    }
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
                    if (!firstLoad) {
                        $state.reload();
                    }
                }
            });

            $rootScope.$on('$stateChangeSuccess', () => {
                $window.scrollTo(0, 0);
                if (firstLoad) {
                    firstLoad = false;
                    return;
                }
                if (union.$localStorage.Authorization) {
                    aNewLogin = false;
                }
            });
        }]);
}());
