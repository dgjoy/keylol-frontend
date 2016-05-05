(function () {
    class MenuController {}

    keylolApp.component('menu', {
        templateUrl: 'src/components/menu.html',
        controller: MenuController,
        controllerAs: 'menu',
        bindings: {
            text: '@',
        },
    });
}());
