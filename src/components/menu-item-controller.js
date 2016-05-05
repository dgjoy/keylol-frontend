(function () {
    class MenuItemController {}

    keylolApp.component('menuItem', {
        templateUrl: 'src/components/menu-item.html',
        controller: MenuItemController,
        controllerAs: 'menuItem',
        bindings: {
            type: '@',
        },
    });
}());
