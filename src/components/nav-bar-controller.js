(function () {
    class NavBarController {
        constructor (stateTree, $http, apiEndpoint, notification) {
            $.extend(this, {
                stateTree,
                $http,
                apiEndpoint,
                notification,
            });
        }
        showUserHub ($event) {
            this.showUserHubPopup({
                templateUrl: 'src/popup/user-hub.html',
                controller: 'UserHubController as userHub',
                event: $event,
                attachSide: 'left',
                align: 'top',
                offsetX: 50,
                offsetY: -5,
                fixedPosition: true,
                inputs: {},
            });
        }
    }

    keylolApp.component('navBar', {
        templateUrl: 'src/components/nav-bar.html',
        controller: NavBarController,
        controllerAs: 'navBar',
    });
}());
