(function () {
    class MainNavigationController {
        constructor ($http, apiEndpoint, utils, union) {
            this.utils = utils;
            this.categories = union.$localStorage.mainNavigation;
            $http.get(`${apiEndpoint}normal-point/active-of-each-type`).then(response => {
                union.$localStorage.mainNavigation = this.categories = response.data;
            });
        }
    }

    keylolApp.component("mainNavigation", {
        templateUrl: "src/sections/main-navigation.html",
        controller: MainNavigationController,
        controllerAs: "mainNavigation",
    });
}());
