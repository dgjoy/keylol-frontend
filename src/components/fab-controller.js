(function () {
    class FabController {
        constructor () {
            if (!this.type) {
                this.type = 'theme';
            }
        }
    }

    keylolApp.component('fab', {
        templateUrl: 'src/components/fab.html',
        controller: FabController,
        controllerAs: 'fab',
        bindings: {
            icon: '@',
            type: '@',
            click: '&',
        },
    });
}());
