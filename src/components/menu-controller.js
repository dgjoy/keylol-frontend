(function () {
    class MenuController {
        constructor (union, $http, apiEndpoint, notification) {
            $.extend(this, {
                union,
                $http,
                apiEndpoint,
                notification,
            });
        }
    }

    keylolApp.component('menu', {
        templateUrl: 'src/components/menu.html',
        controller: MenuController,
        controllerAs: 'menu',
        bindings: {
            text: '@',
        },
    });
}());
