(function () {
    class NavBarController {
        constructor (stateTree, window, utils, $window) {
            $.extend(this, {
                stateTree,
                window,
                utils,
                $window,
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

        showLoginWindow (event) {
            this.window.show({
                event,
                templateUrl: 'src/windows/login.html',
                controller: 'LoginController',
                controllerAs: 'login',
                inputs: { startPage: 0 },
            });
        }

        showRegistrationWindow (event) {
            this.window.show({
                event,
                templateUrl: 'src/windows/registration.html',
                controller: 'RegistrationController',
                controllerAs: 'registration',
            });
        }

        search() {
            this.$window.open(`https://www.google.com/search?q=site:keylol.com+${encodeURIComponent(this.searchText)}`);
        }
    }

    keylolApp.component('navBar', {
        templateUrl: 'src/components/nav-bar.html',
        controller: NavBarController,
        controllerAs: 'navBar',
        bindings: {
            theme: '<',
        },
    });
}());
