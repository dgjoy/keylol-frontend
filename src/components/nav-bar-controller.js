(function () {
    class NavBarController {
        constructor (stateTree, window, utils) {
            $.extend(this, {
                stateTree,
                window,
                utils,
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
                inputs: { startPage: 2 },
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
