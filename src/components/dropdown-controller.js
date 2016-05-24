(function () {
    class DropdownController {
        showSelector($event) {
            if (this.state === 'disabled') {
                return ;
            }

            this.showSelectorPopup({
                templateUrl: 'src/popup/dropdown-selector.html',
                controller: 'DropdownSelectorController as dropdownSelector',
                event: $event,
                attachSide: 'bottom',
                align: 'left',
                offsetX: -15,
                offsetY: -84,
                showDelay: 0,
                closeDelay: 0,
                inputs: {
                    content: this.items,
                },
            }).then(popup => {
                return popup.close;
            }).then(result => {
                if (result !== undefined)
                    this.model = result;
            });
        }
    }

    keylolApp.component('dropdown', {
        templateUrl: 'src/components/dropdown.html',
        controller: DropdownController,
        controllerAs: 'dropdown',
        bindings: {
            items: '<',
            state: '@',
            model: '=',
        },
    });
}());
