(function () {
    "use strict";

    keylolApp.controller("RootController", [
        "$scope", "pageTitle", "union", "$http", "apiEndpoint",
        function ($scope, pageTitle, union, $http, apiEndpoint) {
            pageTitle.loading();
            $scope.$watch(function () {
                return union.$localStorage.login;
            }, function () {
                var login = union.$localStorage.login;
                if (login) {
                    $http.get(apiEndpoint + "user/" + login.UserId, {params: {includeClaims: true}})
                        .then(function (response) {
                            union.$localStorage.user = response.data;
                        }, function () {
                            $http.delete(apiEndpoint + "login/current");
                            delete union.$localStorage.login;
                            alert("登录失效，请重新登录。");
                        });
                } else {
                    delete union.$localStorage.user;
                }
            });
        }
    ]);
})();