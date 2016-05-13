(function () {
    class MenuController {
        constructor (stateTree, $http, apiEndpoint, notification) {
            $.extend(this, {
                stateTree,
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
            object: '<',
        },
    });
}());
