(function () {
    class NavBarController {
        constructor ($scope, union, $http, apiEndpoint, notification) {
            $.extend(this, {
                union,
                $http,
                apiEndpoint,
                notification,
            });
            if (union.$localStorage.user) {
                $scope.$watch(() => {
                    return union.$localStorage.user.MessageCount;
                }, newValue => {
                    this.newMessages = typeof newValue === 'string' ? newValue.split(',').reduce((previous, current) => {
                        return parseInt(previous) + parseInt(current);
                    }) : 'O';
                });
            }
        }
    }

    keylolApp.component('navBar', {
        templateUrl: 'src/components/nav-bar.html',
        controller: NavBarController,
        controllerAs: 'navBar',
    });
}());
