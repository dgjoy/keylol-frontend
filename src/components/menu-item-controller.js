(function () {
    class MenuItemController {
        constructor($rootScope) {
            $.extend(this,{
                $rootScope,
            });
        }

        clickAction($event) {
            if (this.data.clickAction !== undefined)
                this.data.clickAction($event);
        }
    }

    keylolApp.component('menuItem', {
        templateUrl: 'src/components/menu-item.html',
        controller: MenuItemController,
        controllerAs: 'menuItem',
        bindings: {
            data: '<',
        },
    });
}());
