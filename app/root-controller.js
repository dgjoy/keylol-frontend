(function () {
    "use strict";

    keylolApp.controller("RootController", [
        "$scope", "pageTitle", "union", "$http", "apiEndpoint", "notification", "$location", "$rootScope",
        function ($scope, pageTitle, union, $http, apiEndpoint, notification, $location, $rootScope) {
            pageTitle.loading();

            function getUserInfo() {
                $http.get(apiEndpoint + "user/" + union.$localStorage.login.UserId, {
                    params: {
                        includeClaims: true,
                        includeStats: true,
                        includeSubscribeCount: true,
                        includeCommentLike: true
                    }
                }).then(function (response) {
                    union.$localStorage.user = response.data;
                }, function () {
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
                    for (var i in union.$localStorage) {
                        if (union.$localStorage.hasOwnProperty(i) && i.indexOf("$") !== 0)
                            delete union.$localStorage[i];
                    }
                    for (var j in union.$sessionStorage) {
                        if (union.$sessionStorage.hasOwnProperty(j) && j.indexOf("$") !== 0)
                            delete union.$sessionStorage[j];
                    }
                    $location.url("/");
                }
            });

            var firstLoad = true;
            $rootScope.$on("$routeChangeSuccess", function () {
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