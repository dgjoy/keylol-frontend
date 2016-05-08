(function () {
    class NavBarController {
        constructor ($scope, union, $http, apiEndpoint, notification, $element) {
            $.extend(this, {
                union,
                $http,
                apiEndpoint,
                notification,
                $element,
            });
            $scope.$watch(() => {
                if (union.$localStorage.user) {
                    return union.$localStorage.user.MessageCount;
                } else {
                    return null;
                }
            }, newValue => {
                if (newValue) {
                    this.newMessages = typeof newValue === 'string' ? newValue.split(',').reduce((previous, current) => {
                        return parseInt(previous) + parseInt(current);
                    }) : null;
                }
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
