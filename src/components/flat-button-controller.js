(function () {
    class FlatButtonController {
        constructor () {
            if (!this.type) {
                this.type = 'theme';
            }
        }
    }

    keylolApp.component('flatButton', {
        templateUrl: 'src/components/flat-button.html',
        controller: FlatButtonController,
        controllerAs: 'flatButton',
        bindings: {
            text: '@',
            type: '@',
            click: '&',
            themeColor: '<',
            disabled: '<',
        },
    });
}());
