(function () {
    class NavBarController {
        constructor ($scope, union, $http, apiEndpoint, notification) {
            $.extend(this, {
                union,
                $http,
                apiEndpoint,
                notification,
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
    }

    keylolApp.component('navBar', {
        templateUrl: 'src/components/nav-bar.html',
        controller: NavBarController,
        controllerAs: 'navBar',
    });
}());
