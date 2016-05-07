(function () {
    class NavController {
        constructor ($scope, $window) {
            const $$window = $($window);
            const scrollCallback = () => {
                $scope.$apply(() => {
                    this.hasShadow = $$window.scrollTop() > 0;
                });
            };
            $$window.scroll(scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $$window.unbind('scroll', scrollCallback);
                cancelListenRoute();
            });
        }
    }

    keylolApp.component('nav', {
        templateUrl: 'src/sections/nav.html',
        controller: NavController,
        controllerAs: 'nav',
    });
}());
