(function () {
    keylolApp.controller("RootController", [
        "$scope", "pageHead", "union", "$http", "apiEndpoint", "$window",
        "notification", "$location", "$rootScope", "$route",
        ($scope, pageHead, union, $http, apiEndpoint, $window,
         notification, $location, $rootScope, $route) => {
            pageHead.loading();

            let aNewLogin = false;
            function getUserInfo() {
                $http.get(`${apiEndpoint}user/${union.$localStorage.login.UserId}`, {
                    params: {
                        claims: true,
                        stats: true,
                        profilePointBackgroundImage: true,
                        subscribeCount: true,
                        commentLike: true,
                        coupon: true,
                    },
                }).then(response => {
                    const user = union.$localStorage.user;
                    const beforeCoupon = user ? user.Coupon : undefined;
                    union.$localStorage.user = response.data;
                    union.$localStorage.user.fakeCoupon = beforeCoupon;
                    _czc.push(["_setCustomVar", "登录用户",
                        `${response.data.IdCode}-${response.data.UserName}`, 1]);
                    if (aNewLogin) {
                        $route.reload();
                    }
                }, response => {
                    if (response.status === 401) {
                        $http.delete(`${apiEndpoint}login/current`);
                        delete union.$localStorage.login;
                        notification.error("登录失效，请重新登录。");
                    }
                });
            }

            $scope.$watch(() => {
                return union.$localStorage.login;
            },newLogin => {
                if (newLogin) {
                    aNewLogin = true;
                    getUserInfo();
                } else {
                    _czc.push(["_setCustomVar", "登录用户", "游客", 1]);
                    for (const i in union.$localStorage) {
                        if (union.$localStorage.hasOwnProperty(i) && i.indexOf("$") !== 0)
                            delete union.$localStorage[i];
                    }
                    for (const i in union.$sessionStorage) {
                        if (union.$sessionStorage.hasOwnProperty(i) && i.indexOf("$") !== 0)
                            delete union.$sessionStorage[i];
                    }
                    $route.reload();
                }
            });

            let firstLoad = true;
            $rootScope.$on("$routeChangeSuccess", () => {
                $window.scrollTo(0, 0);
                if (firstLoad) {
                    firstLoad = false;
                    return;
                }
                if (union.$localStorage.login) {
                    aNewLogin = false;
                    getUserInfo();
                }
            });
        }]);
}());
