(function () {
    class IconButtonController {
        constructor () {
            if (!this.type) {
                this.type = 'theme';
            }
        }
    }

    keylolApp.component('iconButton', {
        templateUrl: 'src/components/icon-button.html',
        controller: IconButtonController,
        controllerAs: 'iconButton',
        bindings: {
            icon: '@',
            type: '@',
            click: '&',
        },
    });
}());
