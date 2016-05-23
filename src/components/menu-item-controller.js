(function () {
    class MenuItemController {
        constructor($rootScope) {
            $.extend(this,{
                $rootScope,
            });
        }

        clickAction() {
            if (this.data.clickAction !== undefined)
                this.data.clickAction();
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
