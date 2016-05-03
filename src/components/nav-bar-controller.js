(function () {
    class NavBarController {
        constructor (union, $http, apiEndpoint, notification) {
            $.extend(this, {
                union,
                $http,
                apiEndpoint,
                notification,
            });
        }
    }

    keylolApp.component('navBar', {
        templateUrl: 'src/components/nav-bar.html',
        controller: NavBarController,
        controllerAs: 'navBar',
    });
}());
