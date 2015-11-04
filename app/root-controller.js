(function () {
    "use strict";

    keylolApp.controller("RootController", [
        "$scope", "pageTitle", "union", "$http", "apiEndpoint", "notification", "$location",
        function ($scope, pageTitle, union, $http, apiEndpoint, notification, $location) {
            pageTitle.loading();
            $scope.$watch(function () {
                return union.$localStorage.login;
            }, function (newLogin) {
                if (newLogin) {
                    $http.get(apiEndpoint + "user/" + newLogin.UserId, {
                        params: {
                            includeClaims: true,
                            includeStats: true,
                            includeSubscribeCount: true
                        }
                    }).then(function (response) {
                        union.$localStorage.user = response.data;
                    }, function () {
                        $http.delete(apiEndpoint + "login/current");
                        delete union.$localStorage.login;
                    });
                } else {
                    delete union.$localStorage.user;
                    $location.url("/");
                    notification.error("登录失效，请重新登录。");
                }
            });
        }
    ]);
})();