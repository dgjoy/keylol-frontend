(function () {
    "use strict";

    keylolApp.controller("RootController", [
        "$scope", "pageTitle", "union", "$http", "apiEndpoint", "notification", "$location", "$rootScope", "$route",
        function ($scope, pageTitle, union, $http, apiEndpoint, notification, $location, $rootScope, $route) {
            pageTitle.loading();

            function getUserInfo() {
                $http.get(apiEndpoint + "user/" + union.$localStorage.login.UserId, {
                    params: {
                        claims: true,
                        stats: true,
                        profilePointBackgroundImage: true,
                        subscribeCount: true,
                        commentLike: true,
                        coupon: true
                    }
                }).then(function (response) {
                    union.$localStorage.user = response.data;
                    _czc.push(["_setCustomVar", "登录用户", response.data.IdCode + "-" + response.data.UserName, 1]);
                }, function (response) {
                    $http.delete(apiEndpoint + "login/current");
                    delete union.$localStorage.login;
                    notification.error("登录失效，请重新登录。");
                });
            }

            $scope.$watch(function () {
                return union.$localStorage.login;
            }, function (newLogin) {
                if (newLogin) {
                    getUserInfo();
                } else {
                    _czc.push(["_setCustomVar", "登录用户", "游客", 1]);
                    for (var i in union.$localStorage) {
                        if (union.$localStorage.hasOwnProperty(i) && i.indexOf("$") !== 0)
                            delete union.$localStorage[i];
                    }
                    for (var j in union.$sessionStorage) {
                        if (union.$sessionStorage.hasOwnProperty(j) && j.indexOf("$") !== 0)
                            delete union.$sessionStorage[j];
                    }
                    $route.reload();
                }
            });

            var firstLoad = true;
            $rootScope.$on("$routeChangeSuccess", function () {
                window.scrollTo(0, 0);
                if (firstLoad) {
                    firstLoad = false;
                    return;
                }
                if (union.$localStorage.login) {
                    getUserInfo();
                }
            });
        }
    ]);
})();