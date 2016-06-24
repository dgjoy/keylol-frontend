(function () {
    class MenuController {
        constructor (stateTree, $http, apiEndpoint, notification, utils) {
            $.extend(this, {
                stateTree,
                $http,
                apiEndpoint,
                notification,
                utils,
            });
            if (this.object.header && this.object.header.type === 'point') {
                this.circles = [new Array(1), new Array(2), new Array(3), new Array(4), new Array(5)];
            }
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
